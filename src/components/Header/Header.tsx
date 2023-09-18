import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames'
import styles from './header.css';
import logo from '../../public/img/logo.svg'
import burger_btn from '../../public/img/burger_btn.svg'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, FAVORITES_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, SHOP_ROUTE } from '../../utils/consts';
import UserStore, { nullUser } from '../../store/UserStore';
import { config } from 'process';
import DeviceStore from '../../store/DeviceStore';
import BasketStore from '../../store/BasketStore';
import { observer } from 'mobx-react-lite';


export const Header = observer(() => {

  const IS_AUTH = UserStore._isAuth
  const IS_ADMIN = UserStore._user.role === 'ADMIN'


  const [burgerState, setBurgerState] = useState(false)
  const [basketLength, setBasketLength] = useState(BasketStore.basketList.length)

  useEffect(() => {
    setBasketLength((prev: number) => BasketStore.basketList.length)
  }, [BasketStore.basketList, BasketStore.addBasketId, BasketStore.removeBasketId, BasketStore.BASKET_LIST])

  const location = useLocation().pathname
  const isShopLocation = (location === '/')

  const logOut = () => {
    UserStore.setUser(nullUser)
    UserStore.setIsAuth(false)
    localStorage.removeItem('token')
  }



  return (
    <div className={styles.header__wrapper}>
      <Link to={`../${SHOP_ROUTE}`} className={styles.wrapper__element + ' w-max h-full flex flex-col items-center justify-center'}>
        <span className='w-max h-full flex flex-col items-center justify-center'>
          <img className={styles.element__logo_img} src={logo} alt="" />
        </span>
      </Link>
      <div id={styles.wrapper__element_nav} className={styles.wrapper__element}>
        <nav className={styles.element__nav_wrapper}>
          <NavLink preventScrollReset={true} onClick={() => {
            setTimeout(() => { document.getElementById('root')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, (isShopLocation ? 0 : 650))
          }} to={`../${SHOP_ROUTE}`}>
            главная
          </NavLink>
          <NavLink preventScrollReset={true} onClick={() => {
            setTimeout(() => { document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, (isShopLocation ? 0 : 650))
          }} to={`../${SHOP_ROUTE}`}>
            каталог
          </NavLink>
          <NavLink preventScrollReset={true} onClick={() => {
            setTimeout(() => { document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, (isShopLocation ? 0 : 650))
          }} to={`../${SHOP_ROUTE}`}>
            контакты
          </NavLink>
        </nav>
      </div>
      <div className={styles.wrapper__element + ' relative'}>
        <img onMouseEnter={() => setBurgerState(true)} id={styles.element__burger_img} src={burger_btn} alt="" />
        {basketLength !== 0 && <span className='absolute -top-1 -right-1 bg-red-500 text-white roboto w-5 h-5 flex items-center justify-center rounded-full'> {basketLength} </span>}
        <div onMouseLeave={() => setBurgerState(false)} className={burgerState ? classnames(styles.element__burger_burger, styles.burger_active) : styles.element__burger_burger}>
          {IS_ADMIN && <NavLink to={`../${ADMIN_ROUTE}`}>Админ-панель</NavLink>}
          {IS_AUTH && <NavLink to={`../${PROFILE_ROUTE}`}>Личный кабинет</NavLink>}
          {/* {!IS_AUTH && <NavLink to={`../`} >Авторизоваться</NavLink>} */}
          <NavLink to={`../${FAVORITES_ROUTE}`}>Избранное</NavLink>
          <NavLink className={''} to={`../${BASKET_ROUTE}`}>
            Корзина
            {basketLength !== 0 && <span className='absolute top-1 -right-2.5 bg-red-500 opacity-100 text-white basket-span roboto w-3 h-3 flex items-center justify-center rounded-full'> {basketLength} </span>}
          </NavLink>
          {IS_AUTH && <NavLink to={`../${LOGIN_ROUTE}`} onClick={logOut} >Выйти из профиля</NavLink>}
        </div>
      </div>
    </div>
  );
})
