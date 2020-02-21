import Button, { ButtonProps } from '@material-ui/core/Button'
import React, { CSSProperties } from 'react'
import { Provider } from 'react-redux'

import {
  AbstractTrigger,
  AbstractTriggerPropRequirement,
  DefaultControlProps,
  MinimalPropRequirement
} from '../abstract-classes'

export interface LabUiButtonProps extends MinimalPropRequirement, DefaultButtonProps {
  name: string
}

export interface DefaultButtonProps extends ButtonProps, DefaultControlProps {
  text?: string
  inLineStyles?: CSSProperties
}

class ReduxButton extends AbstractTrigger {
  public readonly componentClass: React.ComponentClass<LabUiButtonProps, any> = ReduxButton
  public state: DefaultButtonProps = {}
  protected defaultState: DefaultButtonProps = {
    className: 'button',
    color: 'primary',
    inLineStyles: {
      textTransform: 'none'
    },
    text: 'button text',
    variant: 'contained'
  }

  constructor(props: LabUiButtonProps) {
    super(props)
  }

  public addClickCallback(callback: (self: any) => any): void {
    this.addCallback('click', callback)
  }

  public changeInlineStyles(styles: CSSProperties): void {
    this.state.inLineStyles = { ...this.state.inLineStyles, ...styles }
  }

  public changeSettings(updateState: DefaultButtonProps): void {
    this.state = { ...this.state, ...updateState }
  }

  public render() {
    this.debugLog('The props at render time are: ', this.props)
    const { uiActive } = this.props as AbstractTriggerPropRequirement
    const callbacks = this.callbacks

    return (
      <Provider store={this.store}>
        <Button
          {...this.pureButtonProps()}
          variant={this.state.variant}
          color={this.state.color}
          disabled={this.isDisabled(uiActive)}
          className={this.state.className}
          style={this.state.inLineStyles}
          onClick={() => this.clickCallback(this)}
        >
          {this.state.text}
        </Button>
      </Provider>
    )
  }

  protected pureButtonProps(): ButtonProps {
    const stateCopy = super.cleanState() as DefaultButtonProps
    delete stateCopy.inLineStyles
    return stateCopy
  }

  protected clickCallback(self: ReduxButton): void {
    this.callCallsbacks('click', self)
    this.callCallsbacks('changeUiActiveState', self)
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
