import { Admin } from "./pages/Admin/Admin";
import React, { Suspense, createRef, lazy } from "react";
import { Auth } from "./pages/Auth/Auth";
import Basket from "./pages/Basket/Basket";
import { Favorites } from "./pages/Favorites/Favorites";
import { OfferPage } from "./pages/OfferPage";
import { Profile } from "./pages/Profile/Profile";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_PAGE_ROUTE,
  FAVORITES_ROUTE,
  LOGIN_ROUTE,
  OFFER_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "./utils/consts";
import Preloader from "./components/Preloader/Preloader";
import { LazyShop } from "./pages/Shop/Shop.lazy";
import { LazyBasket } from "./pages/Basket/Basket.lazy";
import Shop from "./pages/Shop/Shop";
import { DeviceLazy } from "./pages/DevicePage/Device.lazy";
import { NotFoundPage } from "./pages/NotFoundPage";

export const authRoutes = [
  {
    path: process.env.ADMIN_ROUTE,
    Component: <Admin />,
    nodeRef: createRef(),
  },
  // {
  //   path: OFFER_ROUTE,
  //   Component: <OfferPage />,
  //   nodeRef: createRef(),
  // },
  {
    path: PROFILE_ROUTE,
    Component: <Profile />,
    nodeRef: createRef(),
  },
  {
    path: BASKET_ROUTE,
    Component: (
      <Suspense fallback={<Preloader />}>
        <LazyBasket />
      </Suspense>
    ),
    nodeRef: createRef(),
  },
  {
    path: SHOP_ROUTE,
    Component: <Shop />,
    nodeRef: createRef(),
    error: <NotFoundPage />
  },
  {
    path: FAVORITES_ROUTE,
    Component: <Favorites />,
    nodeRef: createRef(),
  },
  {
    path: DEVICE_PAGE_ROUTE + "/:id",
    Component: (
      <Suspense fallback={<Preloader />}>
        <DeviceLazy />
      </Suspense>
    ),
    nodeRef: createRef(),
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
    Component: <NotFoundPage />,
    nodeRef: createRef(),
  },
];

export const publicRoutes = [
  // {
  //   path: ADMIN_ROUTE,
  //   Component: <Admin />,
  //   nodeRef: createRef()
  // },
  {
    path: process.env.ADMIN_ROUTE,
    Component: <NotFoundPage />,
    nodeRef: createRef(),
  },
  {
    path: BASKET_ROUTE,
    Component: (
      <Suspense fallback={<Preloader />}>
        <LazyBasket />
      </Suspense>
    ),
    nodeRef: createRef(),
  },
  {
    path: PROFILE_ROUTE,
    Component: <NotFoundPage />,
    nodeRef: createRef(),
  },
  {
    path: SHOP_ROUTE,
    Component: <Shop />,
    nodeRef: createRef(),
  },
  {
    path: FAVORITES_ROUTE,
    Component: <Favorites />,
    nodeRef: createRef(),
  },
  {
    path: DEVICE_PAGE_ROUTE + "/:id",
    Component: (
      <Suspense fallback={<Preloader />}>
        <DeviceLazy />
      </Suspense>
    ),
    nodeRef: createRef(),
  },
  // {
  //   path: REGISTRATION_ROUTE,
  //   Component: <Auth />,
  //   nodeRef: createRef()
  // },
  {
    path: process.env.ADMIN_LOGIN_ROUTE,
    Component: <Auth />,
    nodeRef: createRef(),
  },
];
