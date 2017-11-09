import React from 'react'
import { withState } from 'recompose'

import Aux from 'react-aux'
import { Example } from '../../components/Example/index'
import { Pre } from '../../components/Pre'
import Tabs from '@skbkontur/react-ui/Tabs'

import './styles.css'

export const RoutePath = '/detached-roots-example'

export const DetachedRootExample = withState(
  'tab',
  'changeTab',
  'StaticPage'
)(({ tab, changeTab }) => (
  <Example path={RoutePath} name="Detached Roots">
    <h1>Detached roots</h1>
    <div className="DetachedRoot-tabs">
      <Tabs value={tab} onChange={(_, v) => changeTab(v)}>
        <Tabs.Tab id="StaticPage">Static Page</Tabs.Tab>
        <Tabs.Tab id="AppCode">App Code</Tabs.Tab>
      </Tabs>
    </div>
    {(() => {
      switch (tab) {
        case 'StaticPage':
          return <StaticPage />
        case 'AppCode':
          return <AppCode />
        default:
          return null
      }
    })()}
  </Example>
))

const staticPage = `\
<body>
  <header>
    <img src="logo.svg" />
    <div id="user-notifications"></div>
  </header>
  <main>
    <section>
      <h1>Some title</h1>
      <p>Some content</p>
    </section>
    <sidebar>
      <ul class="sidebar__menu">
        <li>Home</li>
        <li>About</li>
      </ul>
      <div id="calendar"></div>
    </sidebar>
    <div id="root"></div>
  </main>
</body>
`

const StaticPage = () => (
  <Aux>
    <h2>Static page</h2>
    <Pre>{staticPage}</Pre>
  </Aux>
)

const appCode = `\
import {render, createPortal} from 'react-dom'
// ...

const $ = (id) => document.getElementById(id)

const App = () => (
  <Provider store={store}>
    {createPortal(<UserNotifications />, $('user-notifications'))}
    {createPortal(<Calendar />, $('calendar'))}
  </Provider>
)

render(<App />, $('root'))
`

const AppCode = () => (
  <Aux>
    <h2>App code</h2>
    <Pre language="js">{appCode}</Pre>
  </Aux>
)
