import { ReduxComponentBaseClass } from "./base_classes";
import { Reducer, AnyAction } from 'redux'



export class UiGenerator {
	element_list: ReduxComponentBaseClass[] = []
	reducers: {[reducerName:string]: Reducer} = {}


	add_element(element: any){
		this.element_list = [...this.element_list, element]
	}

	combineReducers(){
		let element
		for (element of this.element_list){
			const reducers = element.get_reducers()
			for(let reducerName in reducers){
				if(reducerName in this.reducers && !(element.defaultReducerNames.indexOf(reducerName) > -1)){
					throw `The reducerName '${reducerName}' of the ` + 
								`element with name '${element.name}', is already in reducers.`
				}
				else{
					this.reducers[reducerName] = reducers[reducerName]
				}
			}
		}
	}

	show(){
		this.combineReducers()
		let element
		for (element of this.element_list){
			element.show()
		}
	}

}