import Button, { ButtonProps } from '@material-ui/core/Button'
import * as React from 'react'
/* tslint:disable:no-duplicate-imports */
import { CSSProperties } from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { BaseTrigger, BaseTriggerPropRequirement, MinimalPropRequirement } from '../base-classes'

export interface LabUiButtonProps extends MinimalPropRequirement, DefaultButtonProps {
  name: string
}

export interface DefaultButtonProps extends ButtonProps {
  text?: string
  class_names?: string | string[]
  inLineStyles?: CSSProperties
}

export interface UpdatedLabUiButtonState extends DefaultButtonProps, BaseTriggerPropRequirement {
  name: string
}

class ReduxButton extends BaseTrigger {
  public readonly componentClass: React.ComponentClass<LabUiButtonProps, any> = ReduxButton
  public state: DefaultButtonProps = {}
  protected defaultState: DefaultButtonProps = {
    className: 'button',
    class_names: 'button',
    color: 'primary',
    inLineStyles: {
      textTransform: 'none'
    },
    text: 'button text',
    variant: 'contained'
  }

  constructor(props: LabUiButtonProps) {
    super(props)
    this.setInitState()
  }

  public setInitState(): void {
    const cleanedProps = this.props as DefaultButtonProps
    this.state = { ...this.defaultState, ...cleanedProps }
  }

  public changeInlineStyles(styles: CSSProperties): void {
    this.state.inLineStyles = { ...this.state.inLineStyles, ...styles }
  }

  public changeSettings(updateState: DefaultButtonProps): void {
    this.state = { ...this.state, ...updateState }
  }

  public render() {
    this.debugLog('The props at reder time are: ', this.props)
    const { uiActive, changeUiActiveState } = this.props as BaseTriggerPropRequirement

    return (
      <Provider store={this.store}>
        <Button
          {...this.pureButtonProps()}
          variant={this.state.variant}
          color={this.state.color}
          disabled={this.isDisabled(uiActive)}
          className={this.state.className}
          style={this.state.inLineStyles}
          onClick={() => this.clickCallback()}
        >
          {this.state.text}
        </Button>
      </Provider>
    )
  }

  protected pureButtonProps(): ButtonProps {
    const stateCopy = { ...this.state } as UpdatedLabUiButtonState
    delete stateCopy.inLineStyles
    delete stateCopy.debug
    delete stateCopy.uiActive
    delete stateCopy.changeUiActiveState
    return stateCopy
  }

  protected isDisabled(uiActive: boolean): boolean {
    if ((!this.invertedActiveState && !uiActive) || (this.invertedActiveState && uiActive)) {
      return true
    } else {
      return false
    }
  }

  protected clickCallback(): void {
    for (const callbackObj of this.staticCallbacks) {
      callbackObj.callback(callbackObj.args)
    }
  }
}

export class StartBtn extends ReduxButton {
  public readonly componentClass = StartBtn

  constructor(props: LabUiButtonProps) {
    super(props)
    this.defaultState.text = 'Start'
    this.setInitState()
  }
}

export class StopBtn extends ReduxButton {
  public readonly componentClass = StopBtn

  constructor(props: LabUiButtonProps) {
    super(props)
    this.defaultState.text = 'Stop'
    this.defaultState.color = 'secondary'
    this.setInitState()
    this.invertedActiveState = true
  }
}
