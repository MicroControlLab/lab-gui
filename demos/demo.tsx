import { StartBtn, StopBtn } from '../src/lib/buttons/button'
import { UiGenerator } from '../src/lib/ui_generator'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DeleteIcon from '@material-ui/icons/Delete'

import { Reducer, AnyAction } from 'redux'

// start.class_names = ["test1", "test2"]

const initialState = {
  uiActive: false
}

const testContainer2 = document.querySelector('.test-container2')
const testContainer3 = document.querySelector('.test-container3')
const testContainer4 = document.querySelector('.test-container4')

const Ui = new UiGenerator()

const start1 = new StartBtn({ container: '.test-container', name: 'start1' })
start1.changeSettings({ text: 'start 1' })
const start2 = new StartBtn({
  container: testContainer2,
  name: 'start2',
  text: 'FOOOOOOO',
  debug: true
})
start2.changeSettings({ text: 'start 2', startIcon: <CloudUploadIcon /> })
const start3 = new StartBtn({ container: testContainer3, name: 'start3' })
start3.changeSettings({ text: 'start 3', endIcon: <DeleteIcon /> })
const stop = new StopBtn({
  container: testContainer4,
  name: 'stop',
  text: 'foo'
})
stop.changeSettings({ text: 'Bar' })
stop.changeInlineStyles({ padding: '20px', marginTop: '10px' })

Ui.addElement(start1)
Ui.addElement(start2)
Ui.addElement(start3)
Ui.addElement(stop)
Ui.show()

// start1.

const store = Ui.getStore()

setTimeout(() => {
  console.log('auto actived UI')
  return store.dispatch({ type: 'ACTIVATE_UI' })
}, 2000)
