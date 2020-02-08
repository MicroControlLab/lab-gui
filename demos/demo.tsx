import { StartBtn, StopBtn } from '../src/lib/buttons/button'
import { UiGenerator } from '../src/lib/ui_generator'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Reducer, AnyAction } from 'redux'

// start.class_names = ["test1", "test2"]

const initialState = {
  uiActive: false
}

const TestContainer1 = document.querySelector('.test-container')
const TestContainer2 = document.querySelector('.test-container2')
const TestContainer3 = document.querySelector('.test-container3')
const TestContainer4 = document.querySelector('.test-container4')

const Ui = new UiGenerator()

const start1 = new StartBtn({ container: '.test-container', name: 'start1' })
start1.changeSettings({ text: 'start 1' })
const start2 = new StartBtn({ container: TestContainer2, name: 'start2' })
start2.changeSettings({ text: 'start 2' })
const start3 = new StartBtn({ container: TestContainer3, name: 'start3' })
start3.changeSettings({ text: 'start 3' })
const stop = new StopBtn({
  container: TestContainer4,
  name: 'stop',
  text: 'foo'
})
stop.changeSettings({ text: 'Bar' })
stop.changeInlineStyles({ padding: '20px', marginTop: '10px' })

Ui.add_element(start1)
Ui.add_element(start2)
Ui.add_element(start3)
Ui.add_element(stop)
Ui.show()

const store = Ui.get_store()

setTimeout(() => {
  console.log('auto actived UI')
  return store.dispatch({ type: 'ACTIVATE_UI' })
}, 2000)
