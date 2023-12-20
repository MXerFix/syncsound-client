import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import UserStore, { nullUser } from '../../store/UserStore'
import { ADMIN_ROUTE, BASKET_ROUTE, FAVORITES_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, SHOP_ROUTE } from '../../utils/consts'
import { CardStackMinusIcon, ChatBubbleIcon, HeartIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons'
import { observer } from 'mobx-react-lite'
import BasketStore from '../../store/BasketStore'

export const MobileFooter = observer(() => {

  const IS_AUTH = UserStore._isAuth
  const IS_ADMIN = UserStore._user.role === 'ADMIN'

  const [basketLength, setBasketLength] = useState(BasketStore.basketList.length)

  useEffect(() => {
    setBasketLength((prev: number) => BasketStore.basketList.length)
  }, [BasketStore.basketList, BasketStore.addBasketId, BasketStore.removeBasketId, BasketStore.BASKET_LIST])

  const logOut = () => {
    UserStore.setUser(nullUser)
    UserStore.setIsAuth(false)
    localStorage.removeItem('token')
  }

  const location = useLocation().pathname
  const isShopLocation = (location === '/')

  return (
    <div className='fixed flex flex-row w-full bottom-0 items-center justify-between text-10 px-4 bg-transparent text-[#fff] py-2 z-50 '>
      {IS_ADMIN && <NavLink to={`../${ADMIN_ROUTE}`}>Админ-панель</NavLink>}
      {/* {!IS_AUTH && <NavLink to={`../`} >Авторизоваться</NavLink>} */}
      {/* <NavLink className={'w-[18%] h-10 rounded-xl flex flex-col justify-center items-center text-center bg-[#202020] '} to={`../${IS_AUTH ? PROFILE_ROUTE : LOGIN_ROUTE}`}>
        <PersonIcon />
        Личный кабинет
      </NavLink> */}
      <NavLink className={'w-[23%] h-12 rounded-xl flex flex-col justify-center items-center text-center bg-[#202020] shadow-2xl active:scale-110 transition-all duration-200 '} to={`../${SHOP_ROUTE}`}>
        <HomeIcon className='h-6 w-6' />
        Главная
      </NavLink>
      <NavLink className={'w-[23%] h-12 rounded-xl flex flex-col justify-center items-center text-center bg-[#202020] shadow-2xl active:scale-110 transition-all duration-200 '} to={`../${FAVORITES_ROUTE}`}>
        <HeartIcon className='h-6 w-6' />
        Избранное
      </NavLink>
      <NavLink className={'w-[23%] h-12 rounded-xl flex flex-col justify-center items-center text-center bg-[#202020] shadow-2xl active:scale-110 transition-all duration-200 '} onClick={() => {
        setTimeout(() => { document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, (isShopLocation ? 0 : 650))
      }} to={`../${SHOP_ROUTE}`}>
        <ChatBubbleIcon className='h-6 w-6' />
        Контакты
      </NavLink>
      <NavLink className={' relative w-[23%] h-12 rounded-xl flex flex-col justify-center items-center text-center bg-[#202020] shadow-2xl active:scale-110 transition-all duration-200 '} to={`../${BASKET_ROUTE}`}>
        <CardStackMinusIcon className='h-6 w-6' />
        Корзина
        {basketLength !== 0 && <span className='absolute -top-1 -right-1 bg-red-500 text-white roboto w-5 h-5 flex items-center justify-center rounded-full'> {basketLength} </span>}
      </NavLink>
      {IS_AUTH && <NavLink to={`../${LOGIN_ROUTE}`} onClick={logOut} >Выйти из профиля</NavLink>}
    </div>
  )
})
