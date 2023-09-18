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
import { ErrorModal } from './components/ErrorModal/ErrorModal'
import ErrorStore from './store/ErrorStore'

export const isMobile = window.innerWidth < 720

const App = observer(() => {

  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

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


  return (
    <>
      {ErrorStore.errorType.length ? (<ErrorModal alertType={ErrorStore.errorType} children={ErrorStore.errorMessage} />) : <></>}
      <AppRouter />
    </>
  )
})

export default App
