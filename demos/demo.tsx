import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'

import { StartBtn, StopBtn } from '../src/lib/buttons'
import { ReduxSwitch } from '../src/lib/switch'
import { UiGenerator } from '../src/lib/ui_generator'
import { blue } from '@material-ui/core/colors'

const initialState = {
  uiActive: false
}

const testContainer2 = document.querySelector('.test-container2')
const testContainer3 = document.querySelector('.test-container3')
const testContainer4 = document.querySelector('.test-container4')
const testContainer5 = document.querySelector('.test-container5')

const dummyCallback = (self: any) => {
  console.warn('DummyCallback was executed')
}
const Ui = new UiGenerator()

const start1 = new StartBtn({ container: '.test-container', name: 'start1' })
start1.changeSettings({ text: 'start 1' })

const start2 = new StartBtn({
  container: testContainer2,
  // debug: true,
  name: 'start2',
  text: 'FOOOOOOO'
})
start2.changeSettings({ text: 'start 2', startIcon: <CloudUploadIcon /> })
start2.addClickCallback(dummyCallback)

const start3 = new StartBtn({ container: testContainer3, name: 'start3' })
start3.changeSettings({ text: 'start 3', endIcon: <DeleteIcon /> })

const stop = new StopBtn({
  container: testContainer4,
  name: 'stop',
  text: 'foo'
})
stop.changeSettings({ text: 'Bar' })
stop.changeInlineStyles({ padding: '20px', marginTop: '10px' })
stop.invertedActiveState = false

const switch1 = new ReduxSwitch({
  container: testContainer5,
  debug: true,
  // inLineStyles: { backgroundColor: 'blue' },
  name: 'switch1'
})

Ui.addElement(start1)
Ui.addElement(start2)
Ui.addElement(start3)
Ui.addElement(stop)
Ui.addElement(switch1)
Ui.show()

// start1.

const store = Ui.getStore()

setTimeout(() => {
  console.log('auto actived UI')
  console.log('STORE STATE', store.getState())
  store.dispatch({ type: 'ACTIVATE_UI' })
  console.log(stop.getReducers())
  // switch1.setData(false)
  // stop.setData('BAR')
  // stop.setData('Blub')
  // start1.setData('Foo')
}, 2000)
