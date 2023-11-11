import React, { useEffect, useState } from 'react'
import { Shop } from './pages/Shop/Shop'
import { Router, Routes, Route, Navigate, BrowserRouter, createBrowserRouter, createRoutesFromElements, ScrollRestoration } from 'react-router-dom'
import { authRoutes, publicRoutes } from './routes'
import { Favorites } from './pages/Favorites/Favorites'
import { Basket } from './pages/Basket/Basket'
import AppRouter from './components/AppRouter'
import './main.global.css'
import { HashRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { check } from './http/userAPI'
import UserStore from './store/UserStore'
import Preloader from './components/Preloader/Preloader'
import { ERROR_ALERT, ErrorModal, GREEN_ALERT } from './components/ErrorModal/ErrorModal'
import ErrorStore from './store/ErrorStore'
import { check_yookassa_payment, get_boxberry_cities, get_boxberry_points, get_boxberry_zips } from './http/outsideApi'
import { change_offer_status } from './http/offerAPI'
import { OFFER_ERROR, PAYED } from './offerStatus'
import { OfferPage } from './pages/OfferPage'
import BoxberryStore from './store/BoxberryStore'
import { toJS } from 'mobx'

export const isMobile = window.innerWidth < 720

const App = observer(() => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      await get_boxberry_cities()
        .then(data => BoxberryStore.setCities(data?.data.map((city: any) => { return { name: city.Name, code: city.Code, countryCode: city.CountryCode } }).sort((a: any, b: any) => a.name > b.name ? 1 : -1)))
      await get_boxberry_points()
        .then(data => BoxberryStore.setPvzs(data?.data.map((pvz: any) => { return { address: pvz.Address, code: pvz.Code, city: pvz.CityName, cityCode: pvz.CityCode } })))
      await get_boxberry_zips()
        .then(data => BoxberryStore.setZips(data))
    }
    fetch()
  }, [])

  const [orderPage, setOrderPage] = useState({
    is_open: false,
    status: '',
    offer_id: ''
  })
  const token = localStorage.getItem('token')

  useEffect(() => {
    const payment_id = localStorage.getItem('payment_id') ?? ""
    const offer_id = localStorage.getItem('offer_id') ?? ""
    const isconfirmation = new URLSearchParams(window.location.search).get('payment_confirmation') === 'true'
    const checkPayment = async (payment_id: string, isconfirmation: boolean) => {
      if (isconfirmation) {
        if (payment_id && offer_id) {
          if (await check_yookassa_payment(payment_id)) {
            change_offer_status({ id: offer_id, status: PAYED })
            localStorage.removeItem("payment_id")
            localStorage.removeItem("offer_id")
            setOrderPage({
              is_open: true,
              status: 'succeed',
              offer_id: offer_id
            })
          } else {
            change_offer_status({ id: offer_id, status: OFFER_ERROR })
            localStorage.removeItem("payment_id")
            localStorage.removeItem("offer_id")
            setOrderPage({
              is_open: true,
              status: 'error',
              offer_id: offer_id
            })
          }
        } else if (offer_id) {
          setOrderPage({
            is_open: true,
            status: 'succeed',
            offer_id: offer_id
          })
        }
      }
    }
    checkPayment(payment_id, isconfirmation)
  }, [])






  useEffect(() => {
    if (token) {
      setTimeout(() => {
        check().then((userData) => {
          UserStore.setUser(userData)
          UserStore.setIsAuth(true)
        }).finally(() => setLoading(false)).catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem('token')
          }
        })
      }, 100);
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) return (<Preloader />)

  if (orderPage.is_open) {
    return (
      <>
        <OfferPage offer_id={orderPage.offer_id} status={orderPage.status} />
      </>
    )
  }


  return (
    <>
      {ErrorStore.errorType.length ? (<ErrorModal alertType={ErrorStore.errorType} children={ErrorStore.errorMessage} />) : <></>}
      <AppRouter />
    </>
  )
})

export default App
