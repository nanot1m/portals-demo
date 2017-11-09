import React from 'react'

import Aux from 'react-aux'
import { TooltipExample } from './modules/TooltipExample'
import { DetachedRootExample } from './modules/DetachedRootExample'
import { Main } from './modules/Main'
import { ClickOutsideExample } from './modules/ClickOutsideExample/index'

const AppRoutes = () => (
  <Aux>
    <TooltipExample />
    <ClickOutsideExample />
    <DetachedRootExample />
  </Aux>
)

export const Features = () => (
  <Aux>
    <Main />
    <AppRoutes />
  </Aux>
)
