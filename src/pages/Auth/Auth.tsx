import React, { useState } from 'react';
import { observer } from 'mobx-react-lite'
import { Header } from '../../components/Header/Header';
import styles from './auth.css';
import UserStore, { nullUser } from '../../store/UserStore';
import { redirect, useNavigate } from 'react-router-dom';
import { login, registration } from '../../http/userAPI';
import { PROFILE_ROUTE, SHOP_ROUTE } from '../../utils/consts';
import Preloader from '../../components/Preloader/Preloader';
import ErrorStore from '../../store/ErrorStore';
import { WARNING_ALERT } from '../../components/ErrorModal/ErrorModal';
import { isMobile } from '../../App';
import { MobileFooter } from '../../components/Mobile/Footer';


export const Auth = observer(() => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const [isLogin, setIsLogin] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    setIsLoading(true)
    try {
      let userData
      if (isLogin) {
        if (password.length >= 5) {
          userData = await login(email, password)
          UserStore.setUser(userData)
          UserStore.setIsAuth(true)
          navigate(`/${PROFILE_ROUTE}`)
        } else { ErrorStore.setError(WARNING_ALERT, 'Пароль не может быть короче 8-ми символов!') }
      } else {
        if (password.length >= 8) {
          userData = await registration(name, email, password)
          UserStore.setUser(userData)
          UserStore.setIsAuth(true)
          navigate(`/${PROFILE_ROUTE}`)
        } else { ErrorStore.setError(WARNING_ALERT, 'Пароль не может быть короче 8-ми символов!') }
      }
    } catch (e: any) {
      alert(e.response.data.message)
    }
    setIsLoading(false)
  }

  if (isLoading) return <Preloader />

  return (
    <div className={styles.auth_wrapper}>
      <Header />
      {isLogin &&
        <div className={styles.auth_window}>
          <div className={styles.auth_title}>
            <h1>Войти в профиль</h1>
            <p>или</p>
            <a onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsLogin(false) }} >зарегистрироваться</a>
          </div>
          <form className={styles.auth_form}>
            <label className={styles.auth__input_label} htmlFor="auth__input_email">Электронная почта</label>
            <input required value={email} onChange={e => setEmail(e.target.value)} type="email" name='email' className={styles.auth_input} id='auth__input_email' />
            <label className={styles.auth__input_label} htmlFor="auth__input_password">Пароль</label>
            <input autoComplete='current-password' required value={password} onChange={e => setPassword(e.target.value)} type="password" name='password' className={styles.auth_input} id="auth__input_password" />
            <div className={styles.auth__input_underline}>
              <div>
                <input type="checkbox" name="remember_me" id="auth__input_checkbox" />
                <label className={styles.auth__input_label} htmlFor="auth__input_checkbox">запомнить меня</label>
              </div>
              <a className={styles.auth__forget_password} href="">Забыли пароль?</a>
            </div>
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); click() }} className={styles.auth__logIn_btn}>Войти</button>
          </form>
        </div>}
      {!isLogin &&
        <div className={styles.auth_window}>
          <div className={styles.auth_title}>
            <h1>Зарегистрироваться</h1>
            <p>или</p>
            <a onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsLogin(true) }} >войти в профиль</a>
          </div>
          <form className={styles.auth_form}>
            <label className={styles.auth__input_label} htmlFor="auth__input_name">Ваше имя</label>
            <input value={name} onChange={e => setName(e.target.value)} type="name" name='name' className={styles.auth_input} id='auth__input_name' />
            <label className={styles.auth__input_label} htmlFor="auth__input_email">Электронная почта</label>
            <input required value={email} onChange={e => setEmail(e.target.value)} type="email" name='email' className={styles.auth_input} id='auth__input_email' />
            <label className={styles.auth__input_label} htmlFor="auth__input_password">Пароль</label>
            <input autoComplete='current-password' required value={password} onChange={e => setPassword(e.target.value)} type="password" name='password' className={styles.auth_input} id="auth__input_password" />
            <div className={styles.auth__input_underline}>
              <div>
                <input type="checkbox" name="remember_me" id="auth__input_checkbox" />
                <label className={styles.auth__input_label} htmlFor="auth__input_checkbox">запомнить меня</label>
              </div>
              <a className={styles.auth__forget_password} href="">Забыли пароль?</a>
            </div>
            <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); click() }} className={styles.auth__logIn_btn}>Регистрация</button>
          </form>
        </div>}
        {isMobile && <MobileFooter />}
    </div>
  );
})
