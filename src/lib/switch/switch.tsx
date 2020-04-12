import Switch, { SwitchProps } from '@material-ui/core/Switch'
import React, { CSSProperties } from 'react'
import { Provider } from 'react-redux'

import {
  AbstractTrigger,
  AbstractTriggerPropRequirement,
  DefaultControlProps,
  MinimalPropRequirement,
} from '../abstract-classes'

export interface LabUiSwitchProps extends MinimalPropRequirement, DefaultSwitchProps {
  name: string
}

export interface DefaultSwitchProps extends SwitchProps, DefaultControlProps {
  text?: string
  inLineStyles?: CSSProperties
}

export class ReduxSwitch extends AbstractTrigger {
  public readonly componentClass: React.ComponentClass<LabUiSwitchProps, any> = ReduxSwitch
  public state: DefaultSwitchProps = {}
  public deactivatesUi = false
  protected defaultState: DefaultSwitchProps = {
    checked: false,
    color: 'secondary',
    inLineStyles: {
      textTransform: 'none',
    },
    text: 'button text',
  }

  constructor(props: LabUiSwitchProps) {
    super(props)
    this.debugLog(props)
    this.debugLog(this.props)
    this.setInitState()
    this.addDefaultCallback()
  }

  public addDefaultCallback(): void {
    this.addCallback('onChange', (self: ReduxSwitch) => {
      this.setData(!self.state.checked)
      self.setState({ checked: !self.state.checked })
    })
  }

  public componentDidMount() {
    if (this.deactivatesUi === true) {
      const updatedProps = this.props as AbstractTriggerPropRequirement
      this.addCallback('changeUiActiveState', updatedProps.changeUiActiveState)
      this.addDefaultCallback()
    }
  }

  public addOnChangeCallback(callback: (self: any) => any): void {
    this.addCallback('onChange', callback)
  }

  public onChangeCallback(self: ReduxSwitch): (event: React.ChangeEvent<HTMLInputElement>) => void {
    const callbackWrapper = (event: React.ChangeEvent<HTMLInputElement>) => {
      self.debugLog(event)
      self.callCallsbacks('onChange', self)
      self.callCallsbacks('changeUiActiveState', self)
    }
    return callbackWrapper
  }

  public render() {
    this.debugLog('The props at render time are: ', this.props)
    const { uiActive } = this.props as AbstractTriggerPropRequirement
    const callbacks = this.callbacks
    // {this.state.text}

    return (
      <Provider store={this.store}>
        <Switch
          {...this.pureSwitchProps()}
          checked={this.state.checked}
          color={this.state.color}
          disabled={this.isDisabled(uiActive)}
          style={this.state.inLineStyles}
          onChange={this.onChangeCallback(this)}
        />
      </Provider>
    )
  }

  protected pureSwitchProps(): SwitchProps {
    const stateCopy = super.cleanState() as DefaultSwitchProps
    delete stateCopy.inLineStyles
    return stateCopy
  }
}

export class TriggerSwitch extends ReduxSwitch {}
