import React from 'react'
import PropTypes from 'prop-types'

import Aux from 'react-aux'
import { Slot, Fill } from 'react-slot-fill'
import { NavLink } from 'react-router-dom'
import Link from '@skbkontur/react-ui/Link'

import { AppRoute } from '../../App'
import portalLogo from './portal-logo.png'
import './Main.css'

export const RoutePath = '/'

export const Main = () => (
  <AppRoute
    exact
    path={RoutePath}
    render={() => (
      <Aux>
        <header className="Main-header">
          <img className="Main-logo" src={portalLogo} alt="main-logo" />
        </header>
        <div className="Main-content">
          <div className="Main-menu">
            <Slot name="MainMenu.Item" />
          </div>
        </div>
        <footer className="Main-footer">
          <Link href="https://github.com/nanot1m/portals-demo">
            github.com/nanot1m/portals-demo
          </Link>
        </footer>
      </Aux>
    )}
  />
)

export const MainMenuItem = ({ children, to }) => (
  <Fill name="MainMenu.Item">
    <NavLink to={to} className="Main-menuItem">
      {children}
    </NavLink>
  </Fill>
)

MainMenuItem.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired
}
