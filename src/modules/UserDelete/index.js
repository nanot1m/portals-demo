import React from 'react'

import Aux from 'react-aux'
import { UserSettingsItem } from '../UserSettings/index'
import { UserCardMenuItem } from '../../components/UserCard/index'
import Icon from '@skbkontur/react-ui/Icon'
import Checkbox from '@skbkontur/react-ui/Checkbox'

export class UserDelete extends React.Component {
  state = {
    enabled: false
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

const UserDeleteButton = ({ user, onUserUpdate }) => (
  <span
    onClick={() => onUserUpdate(createUserUpdater(user.id))}
    style={{ padding: '0.5em', display: 'inline-block' }}
  >
    <Icon name="Trash" />
  </span>
)

const createUserUpdater = id => state => {
  return {
    users: state.users.filter(x => x.id !== id)
  }
}
