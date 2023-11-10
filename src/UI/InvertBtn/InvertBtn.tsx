import classNames from 'classnames'
import React, { ReactNode } from 'react'
import styles from './invertbtn.css'

interface InvertBtnI {
  children?: (string | string[] | ReactNode),
  className?: string
  [propKey: string] :any
}

const InvertBtn = ({children, className, ...props}: InvertBtnI) => {
  return (
    <button {...props} className={classNames(styles.invert_btn, className)} >
      <p> {children} </p>
    </button>
  )
}

export default InvertBtn