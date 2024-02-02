import { observer } from 'mobx-react-lite'
import path from 'path'
import React, { createRef, useEffect } from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, Routes, ScrollRestoration, useLocation, useMatches, useNavigate, useNavigation } from 'react-router-dom'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage'
import { authRoutes, publicRoutes } from '../routes'
import UserStore from '../store/UserStore'
import { ADMIN_ROUTE, DEVICE_PAGE_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from '../utils/consts'
import Preloader from './Preloader/Preloader'



const AppRouter = observer(() => {

  const IS_AUTH = UserStore.isAuth

  const routes = (IS_AUTH ? authRoutes.map(({ path, Component, error }) => <Route errorElement={<NotFoundPage />} key={path} path={path} element={Component} />) : publicRoutes.map(({ path, Component }) => <Route errorElement={<NotFoundPage />} key={path} path={path} element={Component} />))

  const router = createBrowserRouter(
    createRoutesFromElements(
      (
        routes
      )
    )
  )


  return (
    <RouterProvider router={router} fallbackElement={<NotFoundPage />} />
  )
})


export default AppRouter