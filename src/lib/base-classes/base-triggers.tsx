import { AnyAction } from 'redux'

import { BaseControl } from './base-control'
import { BaseTriggerPropRequirement, MinimalPropRequirement } from './base-interfaces'

export class BaseTrigger extends BaseControl {
  public readonly componentClass: React.ComponentClass<MinimalPropRequirement, any> = BaseTrigger
  protected deactivatesUi: boolean = true

  constructor(props: MinimalPropRequirement) {
    super(props)
    this.addCallback(this.uiActiveAction)
  }

  // public componentDidMount() {
  //   if (this.deactivatesUi === true) {
  //     const uiActiveAction = this.getUiActiveAction({
  //       invertedActiveState: this.invertedActiveState
  //     })
  //     this.addDispatcher('changeUiActiveState', uiActiveAction)
  //     const updatedProps = this.props as BaseTriggerPropRequirement
  //     this.addStaticCallback(updatedProps.changeUiActiveState)
  //   }
  // }

  protected uiActiveAction = (self: BaseTrigger): AnyAction => {
    if (self.invertedActiveState) {
      return { type: 'ACTIVATE_UI' }
      return { type: 'REQUEST_STOP_ACTION' }
    } else {
      return { type: 'DEACTIVATE_UI' }
    }
  }

  protected cleanState() {
    const cleanedState = super.cleanState() as BaseTriggerPropRequirement
    delete cleanedState.changeUiActiveState
    return cleanedState
  }

  protected isDisabled(uiActive: boolean): boolean {
    if ((!this.invertedActiveState && !uiActive) || (this.invertedActiveState && uiActive)) {
      return true
    } else {
      return false
    }
  }
}
