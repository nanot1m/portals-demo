import React from 'react'
import { withState } from 'recompose'

import Aux from 'react-aux'
import { Tooltip } from '../../components/Tooltip'
import { Example } from '../../components/Example/index'
import Tabs from '@skbkontur/react-ui/Tabs'
import { Pre } from '../../components/Pre'

import './TooltipExample.css'

export const RoutePath = '/tooltip-example'

export const TooltipExample = withState(
  'tab',
  'changeTab',
  'Examples'
)(({ tab, changeTab }) => (
  <Example path={RoutePath} name="Tooltips">
    <h1>Tooltips</h1>
    <div className="TtExample-tabs">
      <Tabs value={tab} onChange={(_, v) => changeTab(v)}>
        <Tabs.Tab id="Examples">Examples</Tabs.Tab>
        <Tabs.Tab id="Info">How does it works?</Tabs.Tab>
      </Tabs>
    </div>
    {(() => {
      switch (tab) {
        case 'Examples':
          return <Examples />
        case 'Info':
          return <Info />
        default:
          return null
      }
    })()}
  </Example>
))

const styleText = `.block {
  overflow: hidden;
  /* other styles */
}`

const Examples = () => (
  <div className="TtExample-content">
    <Pre language={'css'} className="TtExample-pre">
      {styleText}
    </Pre>
    <div className="TtExample-block">
      <h2 className="TtExample-blockHeader">Without portal</h2>
      <Tooltip disablePortal render={renderTooltip('Tooltip without portal')}>
        <span>Hover Me</span>
      </Tooltip>
    </div>
    <div className="TtExample-block">
      <h2 className="TtExample-blockHeader">With portal</h2>
      <Tooltip render={renderTooltip('Tooltip with portal')}>
        <span>Hover Me</span>
      </Tooltip>
    </div>
  </div>
)

const withoutPortalHtml = `<body>
  <div id="Tooltip">
    Hover me
    <div id="Tooltip-content">
      <!-- Tooltip Content -->
    </div>
  </div>

  <!-- ... -->

</body>
`

const portalHtml = `<body>
  <div id="Tooltip">
    Hover me
  </div>

  <!-- ... -->

  <div id="portal">
    <div id="Tooltip-content">
      <!-- Tooltip Content -->
    </div>
  </div>
</body>
`

const Info = () => (
  <Aux>
    <h2>How does it works?</h2>

    <h3>Without portal</h3>
    <Pre>{withoutPortalHtml}</Pre>

    <h3>With portal</h3>
    <Pre>{portalHtml}</Pre>
  </Aux>
)

const renderTooltip = text => () => <div style={{ width: 200 }}>{text}</div>
