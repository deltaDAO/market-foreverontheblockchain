import React, { FormEvent } from 'react'
import { ReactComponent as AddCircle } from '../../../images/add_circle_outline.svg'
import { accountTruncate } from '../../../utils/web3'
import Loader from '../../atoms/Loader'
import styles from './Account.module.css'
import { useWeb3 } from '../../../providers/Web3'
import Blockies from '../../atoms/Blockies'
import Network from './Network'

// Forward ref for Tippy.js
// eslint-disable-next-line
const Account = React.forwardRef((props, ref: any) => {
  const { accountId, accountEns, web3Modal, connect } = useWeb3()

  async function handleActivation(e: FormEvent<HTMLButtonElement>) {
    // prevent accidentially submitting a form the button might be in
    e.preventDefault()

    await connect()
  }

  return !accountId && web3Modal?.cachedProvider ? (
    // Improve user experience for cached provider when connecting takes some time
    <button className={styles.button} onClick={(e) => e.preventDefault()}>
      <Loader message="Reconnecting..." />
    </button>
  ) : accountId ? (
    <button
      className={styles.button}
      aria-label="Account"
      ref={ref}
      onClick={(e) => e.preventDefault()}
    >
      <Network />
      <Blockies accountId={accountId} />
      <span className={styles.address} title={accountId}>
        {accountTruncate(accountEns || accountId)}
      </span>
      <AddCircle aria-hidden="true" className={styles.caret} />
    </button>
  ) : (
    <button
      className={`${styles.button} ${styles.initial}`}
      onClick={(e) => handleActivation(e)}
      // Need the `ref` here although we do not want
      // the Tippy to show in this state.
      ref={ref}
    >
      Connect&nbsp;<span>Wallet</span>
    </button>
  )
})

export default Account
