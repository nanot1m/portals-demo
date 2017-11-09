import React from 'react'
import { withState } from 'recompose'
import Aux from 'react-aux'

import { Example } from '../../components/Example/index'
import { Pre } from '../../components/Pre'
import Input from '@skbkontur/react-ui/Input'
import Button from '@skbkontur/react-ui/Button'
import Tooltip from '@skbkontur/react-ui/Tooltip'
import Toast from '@skbkontur/react-ui/Toast'
import Tabs from '@skbkontur/react-ui/Tabs'
import Gapped from '@skbkontur/react-ui/Gapped'

import './styles.css'

export const RoutePath = '/click-outside'

export const ClickOutsideExample = withState(
  'example',
  'changeExample',
  'InputInTooltip'
)(({ example, changeExample }) => (
  <Example path={RoutePath} name="Click and focus outside">
    <div onKeyDown={handleKeyDown}>
      <h1>Click and focus outside</h1>
      <div className="ClickOutside-row ClickOutside-tabs">
        <Tabs value={example} onChange={(_, v) => changeExample(v)}>
          <Tabs.Tab id="InputInTooltip">Input In Tooltip</Tabs.Tab>
          <Tabs.Tab id="NestedTooltip">Nested Tooltip</Tabs.Tab>
          <Tabs.Tab id="HowToFindPortals">How To Find Portals</Tabs.Tab>
        </Tabs>
      </div>
      {(() => {
        switch (example) {
          case 'InputInTooltip':
            return <InputInTooltip />
          case 'NestedTooltip':
            return <NestedTooltip />
          case 'HowToFindPortals':
            return <HowToFindPortals />
          default:
            return null
        }
      })()}
    </div>
  </Example>
))

const InputInTooltip = () => (
  <Aux>
    <h2>Input in tooltip</h2>
    <div className="ClickOutside-row">
      <span>
        <Tooltip
          trigger="click"
          render={renderTooltip}
          pos="bottom left"
          closeButton={false}
        >
          <Button use="primary" size="medium">
            Click me
          </Button>
        </Tooltip>
      </span>
      <span>
        <ul className="ClickOutside-list">
          <li>Capture mousedown events on document</li>
          <li>Capture focusin event on body</li>
          <li>Compare event target with current element</li>
        </ul>
      </span>
    </div>
  </Aux>
)

const renderTooltip = () => (
  <div>
    <Input autoFocus placeholder="input me" />
  </div>
)

const NestedTooltip = () => (
  <Aux>
    <h2>Nested tooltips</h2>
    <div className="ClickOutside-row">
      <span>
        <Tooltip
          trigger="click"
          render={renderNestedTooltip}
          pos="bottom left"
          closeButton={false}
        >
          <Button use="primary" size="medium">
            Click me
          </Button>
        </Tooltip>
      </span>
      <span>
        <ul className="ClickOutside-list">
          <li>Capture mousedown events on document</li>
          <li>Capture focusin event on body</li>
          <li>
            Traverse dom-nodes up to body recursively comparing event target
            with current element
          </li>
          <li>
            If current element <b>is portal</b>, jump to portal root and
            continue traversing dom-nodes
          </li>
        </ul>
      </span>
    </div>
  </Aux>
)

const renderNestedTooltip = () => (
  <Gapped>
    <Tooltip
      trigger="click"
      render={renderTooltip}
      pos="bottom left"
      closeButton={false}
    >
      <Button use="primary" size="medium">
        Click me too!
      </Button>
    </Tooltip>
    <div
      style={{
        lineHeight: '40px',
        background: '#eee',
        padding: '0 10px',
        borderRadius: 3
      }}
    >
      Just placeholder
    </div>
  </Gapped>
)

const portalHtml = `<body>
  <div>
    Hover me
    <noscript data-portal-root-id="0" />
  </div>

  <!-- ... -->

  <div data-container-root-id="0">
    <!-- Tooltip Content -->
  </div>
</body>
`

const HowToFindPortals = () => (
  <Aux>
    <h2>How to find portals?</h2>

    <h3>Mark portals</h3>
    <Pre>{portalHtml}</Pre>
  </Aux>
)

const handleKeyDown = ({ key }) => Toast.push(key)