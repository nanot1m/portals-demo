import React from 'react'

import { UserCard } from '../../components/UserCard/index'

import './Users.css'
import { UserSettings } from '../UserSettings/index'

export const RoutePath = '/users-example'

const InitialUsers = [
  {
    id: 0,
    name: 'Mahmud',
    age: 27
  },
  {
    id: 1,
    name: 'Madjid',
    age: 19
  },
  {
    id: 2,
    name: 'Mariam',
    age: 18
  },
  {
    id: 3,
    name: 'Muhamed',
    age: 22
  },
  {
    id: 4,
    name: 'Musa',
    age: 23
  },
  {
    id: 5,
    name: 'Milena',
    age: 16
  }
]

export class Users extends React.Component {
  state = {
    users: InitialUsers
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
        {this.state.users.map(x => (
          <UserCard user={x} key={x.id} onUserUpdate={this._handleUserUpdate} />
        ))}
        <div>
          <UserSettings />
        </div>
      </div>
    )
  }

  _handleUserUpdate = updater => {
    this.setState(updater)
  }
}
