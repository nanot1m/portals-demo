import React from 'react'

import Aux from 'react-aux'
import { UserSettingsItem } from '../UserSettings/index'
import { UserCardMenuItem } from '../../components/UserCard/index'
import Icon from '@skbkontur/react-ui/Icon'
import Checkbox from '@skbkontur/react-ui/Checkbox'
import Tooltip from '@skbkontur/react-ui/Tooltip'
import Input from '@skbkontur/react-ui/Input'
import Button from '@skbkontur/react-ui/Button'
import Gapped from '@skbkontur/react-ui/Gapped'

export class UserEditor extends React.Component {
  state = {
    editingEnabled: false
  }

  render() {
    return (
      <Aux>
        {this.state.editingEnabled && (
          <UserCardMenuItem>
            <UserEditForm />
          </UserCardMenuItem>
        )}
        <UserSettingsItem>
          <Checkbox
            checked={this.state.editingEnabled}
            onChange={(_, v) => this.setState({ editingEnabled: v })}
          >
            Editing enabled
          </Checkbox>
        </UserSettingsItem>
      </Aux>
    )
  }
}

class UserEditForm extends React.Component {
  state = {
    name: '',
    age: null,
    trigger: 'closed'
  }

  render() {
    return (
      <Tooltip
        trigger={this.state.trigger}
        render={this._renderForm}
        closeButton={false}
        onCloseClick={this._close}
      >
        <span
          onClick={this._toggle}
          style={{ padding: '0.5em', display: 'inline-block' }}
        >
          <Icon name="Edit" />
        </span>
      </Tooltip>
    )
  }

  _renderForm = () => {
    return (
      <Gapped vertical>
        <Input
          autoFocus
          placeholder="Name"
          value={this.state.name}
          onChange={(_, name) => this.setState({ name })}
        />
        <Input
          placeholder="Age"
          value={this.state.age ? this.state.age.toString() : ''}
          onChange={(_, age) =>
            /^\d*$/.test(age) &&
            this.setState({ age: age ? parseInt(age, 10) : null })}
        />
        <Button use="primary" onClick={this._submit}>
          Save
        </Button>
      </Gapped>
    )
  }

  _submit = () => {
    this.props.onUserUpdate(
      createUserUpdater(this.props.user.id, this.state.name, this.state.age)
    )
    this._close()
  }

  _toggle = () => {
    if (this.state.opened) {
      this._close()
    } else {
      this._open()
    }
  }

  _close = () => {
    this.setState({ trigger: 'closed' })
  }

  _open = () => {
    this.setState({
      trigger: 'opened',
      age: this.props.user.age,
      name: this.props.user.name
    })
  }
}

const createUserUpdater = (id, name, age) => state => {
  const index = state.users.findIndex(x => x.id === id)
  if (index < 0) {
    return state
  }
  return {
    users: [
      ...state.users.slice(0, index),
      { ...state.users[index], name, age },
      ...state.users.slice(index + 1)
    ]
  }
}
