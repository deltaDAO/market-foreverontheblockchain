import React, { ReactElement } from 'react'
import Tooltip from '../../atoms/Tooltip'
import { ReactComponent as Cog } from '../../../images/cog.svg'
import styles from './index.module.css'
import Currency from './Currency'
import Debug from './Debug'
import { ReactComponent as AddCircle } from '../../../images/add_circle_outline.svg'
import useDarkMode from 'use-dark-mode'
import Appearance from './Appearance'
import { darkModeConfig } from '../../../../app.config'
import TokenApproval from './TokenApproval'

export default function UserPreferences(): ReactElement {
  // Calling this here because <Style /> is not mounted on first load
  const darkMode = useDarkMode(false, darkModeConfig)

  return (
    <Tooltip
      content={
        <ul className={styles.preferencesDetails}>
          <Currency />
          <TokenApproval />
          <Appearance darkMode={darkMode} />
          <Debug />
        </ul>
      }
      trigger="click focus"
      className={styles.preferences}
    >
      <AddCircle aria-hidden="true" className={styles.caret} />
      <Cog aria-label="Preferences" className={styles.icon} />
    </Tooltip>
  )
}
