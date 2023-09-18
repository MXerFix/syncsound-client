import React, { useState, useEffect } from 'react';
import styles from './userinfo.css';
import choose_photo from '../../../../../../public/img/choose_profile_photo.svg'
import { ChangeBtn } from '../../../../../../UI/ChangeBtn/ChangeBtn';
import classnames from 'classnames'
import tick_svg from '../../../../../../public/img/tick.svg'
import cross_svg from '../../../../../../public/img/cross.svg'
import reactInputMask from 'react-input-mask'

export function UserInfo({ User }:any) {

  const [nameValue, setNameValue] = useState(User.name)
  const [nameChangeForm, setNameChangeForm] = useState(false)

  const [emailValue, setEmailValue] = useState(User.email)
  const [emailChangeForm, setEmailChangeForm] = useState(false)

  const [telValue, setTelValue] = useState(User.tel ? User.tel : 'Указать телефон')
  const [telChangeForm, setTelChangeForm] = useState(false)

  return (
    <div className={styles.userInfo__wrapper} >
      <div className={styles.userInfo__wrapper_photoBox} >
        <img className={styles.userInfo__wrapper_photo} src={choose_photo} alt="" />
      </div>
      <div className={styles.userInfo__wrapper_infoBox} >
        <div className={styles.infoBox__item}>
          <p className={nameChangeForm ? styles.userInfo__form : classnames(styles.userInfo__form, styles.form_active)}> {nameValue} </p>
          <form className={nameChangeForm ? classnames(styles.userInfo__form, styles.form_active) : styles.userInfo__form} action="">
            <input value={nameValue} onChange={(e) => setNameValue(e.target.value)} className={styles.userInfo__form_input} type="name" />
            <button className={classnames(styles.userInfo__form_button, styles.button_accept)} onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setNameChangeForm(false)
              User.name = nameValue
            }}> <img src={tick_svg} alt="" /> </button>
            <button className={classnames(styles.userInfo__form_button, styles.button_back)} onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setNameChangeForm(false)
              setNameValue(User.name)
            }}> <img src={cross_svg} alt="" /> </button>
          </form>
          <ChangeBtn onClick={() => setNameChangeForm(true)} > изменить </ChangeBtn>
        </div>
        <div className={styles.infoBox__item}>
          <p className={emailChangeForm ? styles.userInfo__form : classnames(styles.userInfo__form, styles.form_active)}> {emailValue} </p>
          <form className={emailChangeForm ? classnames(styles.userInfo__form, styles.form_active) : styles.userInfo__form} action="">
            <input value={emailValue} onChange={e => setEmailValue(e.target.value)} className={styles.userInfo__form_input} type="email" />
            <button className={classnames(styles.userInfo__form_button, styles.button_accept)} onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setEmailChangeForm(false)
              User.email = emailValue
            }}> <img src={tick_svg} alt="" /> </button>
            <button className={classnames(styles.userInfo__form_button, styles.button_back)} onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setEmailChangeForm(false)
              setEmailValue(User.email)
            }}> <img src={cross_svg} alt="" /> </button>
          </form>
          <ChangeBtn onClick={() => setEmailChangeForm(true)} > изменить </ChangeBtn>
        </div>
        <div className={styles.infoBox__item}>
          <p className={telChangeForm ? styles.userInfo__form : classnames(styles.userInfo__form, styles.form_active)}> {telValue} {!telValue && 'Указать телефон'} </p>
          <form className={telChangeForm ? classnames(styles.userInfo__form, styles.form_active) : styles.userInfo__form} action="">
            <input value={telValue} onChange={e => setTelValue(e.target.value)} className={styles.userInfo__form_input} type="tel" />
            <button className={classnames(styles.userInfo__form_button, styles.button_accept)} onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setTelChangeForm(false)
              User.tel = telValue
            }}> <img src={tick_svg} alt="" /> </button>
            <button className={classnames(styles.userInfo__form_button, styles.button_back)} onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setTelChangeForm(false)
              setTelValue(User.tel)
            }}> <img src={cross_svg} alt="" /> </button>
          </form>
          <ChangeBtn onClick={() => setTelChangeForm(true)} > изменить </ChangeBtn>
        </div>

      </div>
    </div>
  );
}
