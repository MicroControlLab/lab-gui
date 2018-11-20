import * as React from 'react'
import * as ReactDOM from "react-dom"
import { Reducer, AnyAction, Store, createStore, Dispatch } from 'redux'
import { connect, Provider } from "react-redux"




import { MinimalPropRequirement , BaseControl } from "./"



export class BaseTrigger extends BaseControl{
	component_class: React.ComponentClass<MinimalPropRequirement, any> = BaseControl
}