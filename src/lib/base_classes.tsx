import * as React from 'react'
import * as ReactDOM from "react-dom"
import { Reducer, AnyAction, Store } from 'redux'



export interface MinimalPropRequirement{
	container: Element|null
	name: string

}

export interface BaseUiState{
	uiActive: boolean
}

const initalBaseUiState:BaseUiState = {
	uiActive: false
}

export class ReduxComponentBaseClass extends React.Component <MinimalPropRequirement, any> {
	name: string = "pure ReduxComponentBaseClass"
	container: Element|null= null
	reducers: {[reducerName:string]: Reducer} = {}
	defaultReducerNames: string[] = ["UiBaseState"]
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
		this.reducers["UiBaseState"] = this.uiActiveReducer
	}

	componentDidMount(){
		this.setState({elementDisabled: (this.uiActive === this.invertedActiveState)})
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

	setStore(store: Store){
		this.store = store
	}

	add_reducer(reducerName: string, reducer: Reducer, 
							allowDefaultReducerOverwrite: boolean=false):void{
		// console.log(this.defaultReducerNames)
		// console.log(reducerName in this.defaultReducerNames)
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

	show():void{
		ReactDOM.render( <h1>The element `{this.name}` of class ReduxComponentBaseClass is an abstract class,
		 which is not supposed to be used on its own but subclassed</h1>, 
			this.container);
	}

	render(){
		return <h1>The element `{this.name}` of class ReduxComponentBaseClass is an abstract class,
		 which is not supposed to be used on its own but subclassed</h1>
	}

}
