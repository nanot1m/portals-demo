import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { Provider, Slot, Fill } from 'react-slot-fill'
import { Features } from './Features'

import './App.css'

const App = () => (
  <Provider>
    <HashRouter>
      <Slot name="App.Route" />
    </HashRouter>
    <Features />
  </Provider>
)

export default App

export const AppRoute = props => (
  <Fill name="App.Route">
    <Route {...props} />
  </Fill>
)
