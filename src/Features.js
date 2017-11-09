import React from 'react'

import Aux from 'react-aux'
import { TooltipExample } from './modules/TooltipExample'
import { DetachedRootExample } from './modules/DetachedRootExample'
import { Main } from './modules/Main'
import { ClickOutsideExample } from './modules/ClickOutsideExample/index'
import { SlotsExample } from './modules/SlotsExample'
import { UserEditor } from './modules/UserEditor'
import { UserDelete } from './modules/UserDelete'

const AppRoutes = () => (
  <Aux>
    <TooltipExample />
    <ClickOutsideExample />
    <DetachedRootExample />
    <SlotsExample />
  </Aux>
)

export const Features = () => (
  <Aux>
    <Main />
    <AppRoutes />
    <UserEditor />
    <UserDelete />
  </Aux>
)
