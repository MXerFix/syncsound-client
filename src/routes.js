import { Admin } from "./pages/Admin/Admin"
import React, { createRef } from 'react';
import { Auth } from "./pages/Auth/Auth"
import { Basket } from "./pages/Basket/Basket"
import { DevicePage } from "./pages/DevicePage/DevicePage"
import { Favorites } from "./pages/Favorites/Favorites"
import { OfferPage } from "./pages/OfferPage"
import { Profile } from "./pages/Profile/Profile"
import { Shop } from "./pages/Shop/Shop"
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_PAGE_ROUTE, FAVORITES_ROUTE, LOGIN_ROUTE, OFFER_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"
import Preloader from "./components/Preloader/Preloader";



export const authRoutes = [
  {
    path: process.env.ADMIN_ROUTE,
    Component: <Admin />,
    nodeRef: createRef()
  },
  {
    path: OFFER_ROUTE,
    Component: <OfferPage />,
    nodeRef: createRef()
  },
  {
    path: PROFILE_ROUTE,
    Component: <Profile />,
    nodeRef: createRef()
  },
  {
    path: BASKET_ROUTE,
    Component: <Basket />,
    nodeRef: createRef()
  },
  {
    path: SHOP_ROUTE,
    Component: <Shop />,
    nodeRef: createRef()
  },
  {
    path: FAVORITES_ROUTE,
    Component: <Favorites />,
    nodeRef: createRef()
  },
  {
    path: DEVICE_PAGE_ROUTE + '/:id',
    Component: <DevicePage />,
    nodeRef: createRef()
  },
  // {
  //   path: REGISTRATION_ROUTE,
  //   Component: <Auth />,
  //   nodeRef: createRef()
  // },
  // {
  //   path: LOGIN_ROUTE,
  //   Component: <Auth />,
  //   nodeRef: createRef()
  // }
  {
    path: process.env.ADMIN_LOGIN_ROUTE,
    Component: <Preloader />,
    nodeRef: createRef()
  }
]

export const publicRoutes = [
  // {
  //   path: ADMIN_ROUTE,
  //   Component: <Admin />,
  //   nodeRef: createRef()
  // },
  {
    path: process.env.ADMIN_ROUTE,
    Component: <Preloader />,
    nodeRef: createRef()
  },
  {
    path: BASKET_ROUTE,
    Component: <Basket />,
    nodeRef: createRef()
  },
  {
    path: PROFILE_ROUTE,
    Component: <Preloader />,
    nodeRef: createRef()
  },
  {
    path: SHOP_ROUTE,
    Component: <Shop />,
    nodeRef: createRef()
  },
  {
    path: FAVORITES_ROUTE,
    Component: <Favorites />,
    nodeRef: createRef()
  },
  {
    path: DEVICE_PAGE_ROUTE + '/:id',
    Component: <DevicePage />,
    nodeRef: createRef()
  },
  // {
  //   path: REGISTRATION_ROUTE,
  //   Component: <Auth />,
  //   nodeRef: createRef()
  // },
  {
    path: process.env.ADMIN_LOGIN_ROUTE,
    Component: <Auth />,
    nodeRef: createRef()
  }
]