import React from 'react';
import styles from './changebtn.css';

interface changeBtnInterface {
  children?:string,
  [propName: string]: any;
}

export function ChangeBtn( {children, ...props}:changeBtnInterface ) {
  return (
    <button {...props} className={styles.change_btn}>
      {children}
    </button>
  );
}
