import React from 'react'
import styles from './advantage.css'

interface AdvantageI {
  children: any,
  img: string
}

const Advantage = ({children, img}:AdvantageI) => {
  return (
    <div className={styles._advantage}>
      <h5 className={styles._advantage__title}> {children} </h5>
      <img className={styles._advantage__img} src={img} alt="" />
    </div>
  )
}

export default Advantage