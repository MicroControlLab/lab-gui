import { Store, Dispatch } from 'redux'

import * as React from 'react'
/* tslint:disable:no-duplicate-imports */
import { CSSProperties } from 'react'
import * as ReactDOM from 'react-dom'
import Button, { ButtonProps } from '@material-ui/core/Button'
import { Provider } from 'react-redux'

import { MinimalPropRequirement, BaseTrigger } from '../base-classes'

export interface LabUiButtonProps extends MinimalPropRequirement, DefaultButtonProps {
  name: string
}

interface DefaultButtonProps extends ButtonProps {
  text?: string
  class_names?: string | string[]
  inLineStyles?: CSSProperties
}

class ReduxButton extends BaseTrigger {
  componentClass: React.ComponentClass<LabUiButtonProps, any> = ReduxButton
  defaultState: DefaultButtonProps = {
    color: 'primary',
    text: 'button text',
    class_names: 'button',
    className: 'button',
    variant: 'contained',
    inLineStyles: {
      textTransform: 'none'
    }
  }
  state: DefaultButtonProps = {}

  constructor(props: LabUiButtonProps) {
    super(props)
    this.set_init_state()
  }

  set_init_state(): void {
    let cleanedProps = this.props as DefaultButtonProps
    this.state = { ...this.defaultState, ...cleanedProps }
  }

  changeInlineStyles(styles: CSSProperties): void {
    this.state.inLineStyles = { ...this.state.inLineStyles, ...styles }
  }

  changeSettings(updateState: DefaultButtonProps): void {
    this.state = { ...this.state, ...updateState }
  }

  is_disabled(uiActive: boolean): boolean {
    if ((this.deactivatesUi && !uiActive) || (!this.deactivatesUi && uiActive)) {
      return true
    } else {
      return false
    }
  }

  clickCallback(): void {
    for (let callbackObj of this.callbacks) {
      callbackObj.callback(callbackObj.args)
    }
  }

  render() {
    this.log('The props at reder time are: ', this.props)
    const { uiActive, changeUiActiveState } = this.props

    return (
      <Provider store={this.store}>
        <Button
          variant={this.state.variant}
          color={this.state.color}
          disabled={this.is_disabled(uiActive)}
          className={this.state.className}
          style={this.state.inLineStyles}
          onClick={() => {
            this.clickCallback()
          }}
        >
          {this.state.text}
        </Button>
      </Provider>
    )
  }
}

export class StartBtn extends ReduxButton {
  componentClass = StartBtn

  constructor(props: LabUiButtonProps) {
    super(props)
    this.defaultState.text = 'Start'
    this.set_init_state()
  }
}

export class StopBtn extends ReduxButton {
  componentClass = StopBtn

  constructor(props: LabUiButtonProps) {
    super(props)
    this.defaultState.text = 'Stop'
    this.defaultState.color = 'secondary'
    this.set_init_state()
    this.deactivates_ui = false
    this.invertedActiveState = true
  }
}
