import React from 'react'
import styles from './preloadermini.css'

const PreloaderMini = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.loader}></div>
    </div>
  )
}

export default PreloaderMini