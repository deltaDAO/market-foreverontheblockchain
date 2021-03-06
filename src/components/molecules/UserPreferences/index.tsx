import React, { ReactElement } from 'react'
import Tooltip from '../../atoms/Tooltip'
import { ReactComponent as Cog } from '../../../images/cog.svg'
import styles from './index.module.css'
import Currency from './Currency'
import Debug from './Debug'
import { ReactComponent as AddCircle } from '../../../images/add_circle_outline.svg'
import TokenApproval from './TokenApproval'
import { useSiteMetadata } from '../../../hooks/useSiteMetadata'

export default function UserPreferences(): ReactElement {
  const { allowDynamicPricing } = useSiteMetadata().appConfig

  return (
    <Tooltip
      content={
        <ul className={styles.preferencesDetails}>
          <Currency />
          {allowDynamicPricing === 'true' && <TokenApproval />}
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
