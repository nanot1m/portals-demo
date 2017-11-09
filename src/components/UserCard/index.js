import React from 'react'
import PropTypes from 'prop-types'
import { Slot, Fill } from 'react-slot-fill'

import './UserCard.css'

export const UserCard = props => (
  <div className="UserCard-root">
    <div className="UserCard-infoRow">
      <div className="UserCard-label">Name</div>
      <div className="UserCard-value">{props.user.name}</div>
    </div>
    <div className="UserCard-infoRow">
      <div className="UserCard-label">Age</div>
      <div className="UserCard-value">{props.user.age}</div>
    </div>
    <Slot name="UserCard.MenuItem" fillChildProps={props}>
      {items =>
        Boolean(items.length) ? (
          <div className="UserCard-menu">
            {React.Children.map(items, item => (
              <div className="UserCard-menuItem" key={item.key}>
                {React.cloneElement(item, { onUserUpdate: props.onUserUpdate })}
              </div>
            ))}
          </div>
        ) : null}
    </Slot>
  </div>
)

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
  }).isRequired,
  onUserUpdate: PropTypes.func
}

export const UserCardMenuItem = props => (
  <Fill name="UserCard.MenuItem" {...props} />
)
