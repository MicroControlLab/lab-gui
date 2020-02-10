import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Reducer, AnyAction, Store, createStore, Dispatch } from 'redux'
import { connect, Provider } from 'react-redux'

import { MinimalPropRequirement } from './base-interfaces'
import { BaseControl } from './base-control'

export interface BaseTriggerPropRequirement extends MinimalPropRequirement {
  changeUiActiveState: (args: { invertedActiveState: boolean }) => void
  uiActive: boolean
}

export class BaseTrigger extends BaseControl {
  componentClass: React.ComponentClass<MinimalPropRequirement, any> = BaseTrigger
  deactivatesUi: boolean = true

  constructor(props: MinimalPropRequirement) {
    super(props)
    this.addDispatcher('changeUiActiveState', this.uiActiveAction)
  }
  componentDidMount() {
    if (this.deactivatesUi === true) {
      const updatedProps = this.props as BaseTriggerPropRequirement
      this.addStaticCallback(updatedProps.changeUiActiveState, {
        invertedActiveState: this.invertedActiveState
      })
    }
  }

  uiActiveAction(args: { invertedActiveState: boolean }): AnyAction {
    if (args.invertedActiveState) {
      return { type: 'ACTIVATE_UI' }
      return { type: 'REQUEST_STOP_ACTION' }
    } else {
      return { type: 'DEACTIVATE_UI' }
    }
  }
}
