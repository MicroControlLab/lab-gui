import { AnyAction } from 'redux'

import { AbstractControl } from './abstract-control'
import { AbstractTriggerPropRequirement, MinimalPropRequirement } from './abstract-interfaces'

export class AbstractTrigger extends AbstractControl {
  public readonly componentClass: React.ComponentClass<
    MinimalPropRequirement,
    any
  > = AbstractTrigger
  protected deactivatesUi: boolean = true

  constructor(props: MinimalPropRequirement) {
    super(props)
    this.addDispatcher('changeUiActiveState', (self: AbstractTrigger) => self.uiActiveAction(self))
  }

  public componentDidMount() {
    if (this.deactivatesUi === true) {
      const updatedProps = this.props as AbstractTriggerPropRequirement
      this.addCallback('changeUiActiveState', updatedProps.changeUiActiveState)
    }
  }

  protected uiActiveAction(self: AbstractTrigger): AnyAction {
    if (self.invertedActiveState) {
      return { type: 'ACTIVATE_UI' }
      return { type: 'REQUEST_STOP_ACTION' }
    } else {
      return { type: 'DEACTIVATE_UI' }
    }
  }

  protected cleanState() {
    const cleanedState = super.cleanState() as AbstractTriggerPropRequirement
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
