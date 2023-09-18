import React from 'react';
import styles from './profileblock.css';
import { ResetPassword } from './ProfileBlock/components/ResetPassword/ResetPassword';
import { UserInfo } from './ProfileBlock/components/UserInfo/UserInfo';

export function ProfileBlock({User}:any) {
  return (
    <div className={styles.profile_block__wrapper}>
      <h2 className={styles.wrapper__title} >Личный кабинет</h2>
      <div className={styles.wrapper__box} >
        <UserInfo User={User} />
        <ResetPassword />
      </div>
    </div>
  );
}
