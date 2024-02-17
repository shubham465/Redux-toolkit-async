import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import { store } from '.'

function index2() {
  return (
    <div>
      <Provider store={store}>
        <App/>
        </Provider>
    </div>
  )
}

export default index2