import React from 'react'
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

const styles = {
  root: {
    padding: '1em'
  },
  item: {
    marginBottom: '1em'
  }
}
