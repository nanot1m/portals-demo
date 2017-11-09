import React from 'react'
import PropTypes from 'prop-types'

import Aux from 'react-aux'

import { MainMenuItem } from '../../modules/Main'
import { AppRoute } from '../../App'
import { CommonLayout } from '../../layouts/Common'

export const Example = ({ path, children, name }) => (
  <Aux>
    <MainMenuItem to={path}>{name}</MainMenuItem>
    <AppRoute
      path={path}
      render={() => <CommonLayout content={children} />}
    />
  </Aux>
)

Example.propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.node,
    name: PropTypes.string.isRequired
}
