import * as React from 'react'
import * as ReactDOM from "react-dom"
import { Reducer, AnyAction, Store, createStore, Dispatch } from 'redux'
import { connect, Provider } from "react-redux"

import { MinimalPropRequirement, BaseUiState } from "."

const dummyreducer = (state: any={}, action: any) => state

interface dispatchObjectState {
	dispatchObj:{[callbackName:string]:Dispatch}
}

export class BaseView extends React.Component <MinimalPropRequirement, any> {
	component_class: React.ComponentClass<MinimalPropRequirement, any> = BaseView

	name: string = "pure ReduxComponentBaseClass"
	container: Element|null= null
	debug:boolean = false
	reducers: {[reducerName:string]: Reducer} = {}
	defaultReducerNames: string[] = []
	invertedActiveState: boolean = false
	deactivates_ui: boolean = false
	uiActive: boolean = false
	store: Store
	dispatchers: {[callbackName:string]: Function} = {}


	constructor(props: MinimalPropRequirement){
		super(props)
		this.state = {dispatchObj: {}}
  	this.name = props.name
  	if(props.debug){
  		this.debug = props.debug
  	}
		this.validate_container(props.container)
		// this initialisation of store just exists to satisfy TS lint
		this.store = createStore(dummyreducer)
	}

	validate_container(container: MinimalPropRequirement["container"]){
		if(container instanceof Element){
			this.container = this.props.container as Element
		}
		else if(typeof container === "string"){
			let selectedElements = document.querySelectorAll(container)
			if(selectedElements.length === 1){
				this.container = selectedElements[0]
			}
			else if(selectedElements.length === 0){
				throw `The container selector of ${this.name} needs to match exactly one ` +
							`valid html element. The given value of container is ${container} ` +
							`and matches no element.`
			}
			else{
				console.warn( `The container selector of ${this.name} needs to match exactly one ` +
											`valid html element. The given value of container is ${container} ` +
											`and matches:`)

				console.log(selectedElements)
				this.container = selectedElements[0]
			}
		}
		else{
			throw `The container of ${this.name} needs to be a querySelector string or ` +
						`a valid html element. The given value is ${container}`
		}
	}

	show():void{
		const Container = this.getReduxContainer()
		ReactDOM.render(
			<Provider store={this.store}>
				< Container {...this.props} {...this.state} />
			</ Provider>,
		this.container)
	}

	render(){
		return <h1>The element `{this.name}` of class ReduxComponentBaseClass is an abstract class,
		 which is not supposed to be used on its own but subclassed</h1>
	}

	setStore(store: Store){
		this.store = store
	}

	addReducer(reducerName: string, reducer: Reducer,
							allowDefaultReducerOverwrite: boolean=false):void{
		if(this.defaultReducerNames.indexOf(reducerName) > -1 &&
				!allowDefaultReducerOverwrite){
			console.warn(`The reducerName '${reducerName}', in the ` +
									 `element with name '${this.name}' is part of the `+
									 `default reducers of that class. Changing it could lead to ` +
									 `unexpected behaviour. If you are absoulutly sure this is what you ` +
									 `want to do, you can use 'allowDefaultReducerOverwrite=true'`
			)
		}
		else if(reducerName in this.reducers){
			throw `The reducerName '${reducerName}' of the ` +
						`element with name '${this.name}', is allready in its reducers.`
		}
		this.reducers[reducerName] = reducer
	}

	getReducers():{[reducerName:string]: Reducer}{
		return this.reducers
	}

	getMapStateToProps(state: any): object{
		return {}
	}

	getMapDispatchToProps(dispatchers: {[callbackName:string]: Function}){
		return {}
	}

	getReduxContainer(){
		const mapDispatchToProps = this.getMapDispatchToProps(this.dispatchers)
		const Container = connect(
			this.getMapStateToProps,
			mapDispatchToProps
			)(this.component_class)
		return Container
	}

	setDebug(useDebug: boolean): void{
		this.debug = useDebug
	}

	log(...args:any[]){
		if(this.debug){
			console.warn("Debug message from the element with name: ", this.name)
			console.log("The Attributes of this instance are: ", this)
			console.log(...args)
		}
	}

}
