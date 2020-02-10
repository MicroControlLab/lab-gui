import { AnyAction } from 'redux'

import { BaseControl } from './base-control'
import { MinimalPropRequirement } from './base-interfaces'

export interface BaseTriggerPropRequirement extends MinimalPropRequirement {
  changeUiActiveState: (args: { invertedActiveState: boolean }) => AnyAction
  uiActive: boolean
}

export class BaseTrigger extends BaseControl {
  public readonly componentClass: React.ComponentClass<MinimalPropRequirement, any> = BaseTrigger
  protected deactivatesUi: boolean = true

  constructor(props: MinimalPropRequirement) {
    super(props)
    this.addDispatcher('changeUiActiveState', this.uiActiveAction)
  }

  public componentDidMount() {
    if (this.deactivatesUi === true) {
      const updatedProps = this.props as BaseTriggerPropRequirement
      this.addStaticCallback(updatedProps.changeUiActiveState, {
        invertedActiveState: this.invertedActiveState
      })
    }
  }

  protected uiActiveAction(args: { invertedActiveState: boolean }): AnyAction {
    if (args.invertedActiveState) {
      return { type: 'ACTIVATE_UI' }
      return { type: 'REQUEST_STOP_ACTION' }
    } else {
      return { type: 'DEACTIVATE_UI' }
    }
  }
}
