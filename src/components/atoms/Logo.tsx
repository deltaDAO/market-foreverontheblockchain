import React, { ReactElement } from 'react'
import { ReactComponent as LogoAssetBranding } from '../../images/logo.svg'
import { ReactComponent as LogoAsset } from '../../images/logo-no-wordmark.svg'

import styles from './Logo.module.css'

export default function Logo({
  noWordmark
}: {
  noWordmark?: boolean
}): ReactElement {
  return noWordmark ? (
    <LogoAsset className={styles.logo} />
  ) : (
    <LogoAssetBranding className={styles.brand} />
  )
}
