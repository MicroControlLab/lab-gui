import * as React from 'react'
import * as ReactDOM from "react-dom"
import { Reducer, AnyAction, Store, createStore, Dispatch } from 'redux'
import { connect, Provider } from "react-redux"



export interface MinimalPropRequirement{
	container: Element|null
	name: string

}

export interface BaseUiState{
	uiActive: boolean
}

export interface GlobalBaseUiState{
	UiActiveState: BaseUiState
}

const initalBaseUiState:BaseUiState = {
	uiActive: false
}

export class ReduxComponentBaseClass extends React.Component <MinimalPropRequirement, any> {
	component_class: React.ComponentClass<MinimalPropRequirement, any> = ReduxComponentBaseClass
	name: string = "pure ReduxComponentBaseClass"
	container: Element|null= null
	reducers: {[reducerName:string]: Reducer} = {}
	defaultReducerNames: string[] = ["UiActiveState"]
	invertedActiveState: boolean = false
	deactivates_ui: boolean = false
	uiActive: boolean = false
	state = {
		elementDisabled: true
	}
	store: Store

	
	constructor(props: MinimalPropRequirement){
		super(props)
		if(props.container !== undefined){
    	this.container = props.container
		}
		if(props.name !== undefined){
    	this.name = props.name
		}
		this.reducers["UiActiveState"] = this.uiActiveReducer
		this.store = createStore(this.uiActiveReducer)
		// console.log(this.uiActiveAction)
	}

	componentDidMount(){
		this.setState({elementDisabled: (this.uiActive === this.invertedActiveState)})
	}

	show():void{
		// ReactDOM.render( <h1>The element `{this.name}` of class ReduxComponentBaseClass is an abstract class,
		//  which is not supposed to be used on its own but subclassed</h1>, 
		// 	this.container);
		// console.log(typeof(this.component_class))
		const Container = this.get_container()
		ReactDOM.render(
			<Provider store={this.store}>
				< Container {...this.props} /> 
			</ Provider>,
		this.container)

	}

	render(){
		return <h1>The element `{this.name}` of class ReduxComponentBaseClass is an abstract class,
		 which is not supposed to be used on its own but subclassed</h1>
	}

	uiActiveReducer(state: BaseUiState=initalBaseUiState, action: AnyAction):BaseUiState{
		switch(action.type){
    	case "ACTIVATE_UI":
    		return {...state, uiActive: true}
    	case "DEACTIVATE_UI":
    		return {...state, uiActive: false}
    	default:
    		return state
		}
	}

	uiActiveAction(invertedActiveState: boolean):AnyAction{
		if(invertedActiveState){
			return {type: "ACTIVATE_UI"}
		}
		else{
			return {type: "DEACTIVATE_UI"}			
		}
	}

	setStore(store: Store){
		this.store = store
	}

	add_reducer(reducerName: string, reducer: Reducer, 
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

	get_reducers():{[reducerName:string]: Reducer}{
		return this.reducers
	}

	get_mapStateToProps(state: GlobalBaseUiState){
		return {uiActive: state.UiActiveState.uiActive}
	}

	get_mapDispatchToProps(dispatch: Dispatch){
		return {changeUiActiveState: (invertedActiveState: boolean) => {dispatch(outsideUiActiveAction(invertedActiveState))}}
	}

	get_container(){
		const mapDispatchToProps = this.get_mapDispatchToProps
		const Container = connect(
			this.get_mapStateToProps,
			mapDispatchToProps
			)(this.component_class)
		return Container
	}

}

const outsideUiActiveAction = (invertedActiveState: boolean):AnyAction => {
		if(invertedActiveState){
			return {type: "ACTIVATE_UI"}
		}
		else{
			return {type: "DEACTIVATE_UI"}			
		}
	}