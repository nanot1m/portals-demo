import React from 'react'
import PropTypes from 'prop-types'

import Aux from 'react-aux'
import { Link } from 'react-router-dom'
import TopBar from '@skbkontur/react-ui/TopBar'

import { RoutePath as MainRoutePath } from '../../modules/Main'

import './Common.css'

export const CommonLayout = ({ content }) => (
  <Aux>
    <TopBar
      suffix="portal"
      noWidget
      color="#22B4E6"
      href={MainRoutePath}
      logoComponent={({ href, ...rest }) => <Link to={href} {...rest} />}
    />
    <div className="CommonLayout-content">{content}</div>
  </Aux>
)

CommonLayout.propTypes = {
  content: PropTypes.node
}
