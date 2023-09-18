import React from 'react';
import styles from './resetpassword.css';

export function ResetPassword() {
  return (
    <div className={styles.resetPassword__wrapper}>
      <h3 className={styles.resetPassword_title}>Cменить пароль:</h3>
      <form className={styles.resetPassword__form_wrapper} action="">
        <div className={styles.form__item}>
          <label className={styles.form__item_label} htmlFor="reset_password__old_password">Старый пароль:</label>
          <input className={styles.form__item_input} autoComplete='current-password' id='reset_password__old_password' type="password" />
        </div>
        <div className={styles.form__item}>
          <label className={styles.form__item_label} htmlFor="reset_password__new_password">Новый пароль:</label>
          <input className={styles.form__item_input} autoComplete='new-password' id='reset_password__new_password' type="password" />
        </div>
        <div className={styles.form__item}>
          <label className={styles.form__item_label} htmlFor="reset_password__new_password_repeat">Повторите новый пароль:</label>
          <input className={styles.form__item_input} autoComplete='new-password' id='reset_password__new_password_repeat' type="password" />
        </div>
        <button>Сохранить</button>
      </form>
    </div>
  );
}
