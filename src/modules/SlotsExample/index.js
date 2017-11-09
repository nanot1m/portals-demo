import React from 'react'
import { withState } from 'recompose'

import Aux from 'react-aux'
import { Example } from '../../components/Example/index'
import { Users } from '../Users/index'
import Tabs from '@skbkontur/react-ui/Tabs'
import { UserSettings } from '../UserSettings/index'

import './SlotsExample.css'
import { Pre } from '../../components/Pre/index'

export const RoutePath = '/slots-example'

export const SlotsExample = withState(
  'tab',
  'changeTab',
  'Users'
)(({ tab, changeTab }) => (
  <Example path={RoutePath} name="Slots">
    <h1>Slots</h1>
    <div className="TtExample-tabs">
      <Tabs value={tab} onChange={(_, v) => changeTab(v)}>
        <Tabs.Tab id="Users">Users</Tabs.Tab>
        <Tabs.Tab id="Settings">Settings</Tabs.Tab>
        <Tabs.Tab id="Info">How does it works?</Tabs.Tab>
      </Tabs>
    </div>
    {(() => {
      switch (tab) {
        case 'Users':
          return <Users />
        case 'Settings':
          return <UserSettings />
        case 'Info':
          return <Info />
        default:
          return null
      }
    })()}
  </Example>
))

const settingsCode = `\
import { Slot, Fill } from 'react-slot-fill'

export const UserSettings = () => (
  <div style={styles.root}>
    <h2>Users Settings</h2>
    <Slot name="UserSettings" />
  </div>
)

export const UserSettingsItem = ({ children }) => (
  <Fill name="UserSettings">
    <div style={styles.item}>{children}</div>
  </Fill>
)
`

const featureCode = `
export class UserDelete extends React.Component {
  state = {
    enabled: true
  }

  render() {
    return (
      <Aux>
        {this.state.enabled && (
          <UserCardMenuItem>
            <UserDeleteButton />
          </UserCardMenuItem>
        )}
        <UserSettingsItem>
          <Checkbox
            checked={this.state.enabled}
            onChange={(_, v) => this.setState({ enabled: v })}
          >
            Deleting enabled
          </Checkbox>
        </UserSettingsItem>
      </Aux>
    )
  }
}
`

const Info = () => (
  <Aux>
    <section>
      <h2>Settings component</h2>
      <Pre language="javasript">{settingsCode}</Pre>
    </section>
    <section>
      <h2>Feature code</h2>
      <Pre language="javasript">{featureCode}</Pre>
    </section>
  </Aux>
)
