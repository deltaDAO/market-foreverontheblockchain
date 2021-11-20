import React from 'react'
import Lottie from 'react-lottie-player'
import styles from './LottieVisualizer.module.css'

export default function LottieVisualizer({
  source
}: {
  source: Record<string, unknown>
}): JSX.Element {
  return (
    <div className={styles.animation}>
      <Lottie loop animationData={source} play />
    </div>
  )
}
