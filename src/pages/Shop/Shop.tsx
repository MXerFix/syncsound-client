import React, { useEffect, useRef } from 'react';
import { ScrollRestoration, useLocation, useOutlet } from 'react-router-dom';
import { Advantages } from '../../components/Advantages/Advantages';
import { Banner } from '../../components/Banner/Banner';
import { Catalog } from '../../components/Catalog/Catalog';
import { Contacts } from '../../components/Contacts/Contacts';
import { Header } from '../../components/Header';
import { MarketOffers } from '../../components/MarketOffers/MarketOffers';
import styles from './shop.css';
import { createRef } from 'react'
import { authRoutes } from '../../routes';
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { fetchTypes } from '../../http/typesAPI';
import TypesStore from '../../store/TypesStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import BrandsStore from '../../store/BrandsStore';
import DeviceStore from '../../store/DeviceStore';
import { fetchDevices } from '../../http/deviceAPI';
import { fetchBrands } from '../../http/brandsAPI';
import { isMobile } from '../../App';
import { MobileFooter } from '../../components/Mobile/Footer';
import { Footer } from '../../components/Footer/Footer';
import { OfferPage } from '../OfferPage';
import { fetchColors } from '../../http/colorsApi';
import ColorsStore from '../../store/ColorsStore';
import { get_boxberry_cities } from '../../http/outsideApi';



const Shop = observer(() => {


  // useEffect(() => {
  //   fetchTypes().then(data => TypesStore.setTypes(data))
  //   fetchBrands().then(data => BrandsStore.setBrands(data))
  //   fetchDevices().then(data => DeviceStore.setDevices(data))
  //   fetchColors().then(data => ColorsStore.setColors(data))
  // }, [])



  return (
    <div>
      <Header />
      <div className='content'>
        <Banner />
        {/* <MarketOffers /> */}
        <Catalog />
        <Advantages />
        <Contacts id='contacts' />
      </div>
      {isMobile ? <MobileFooter /> : <Footer />}
      <ScrollRestoration />
    </div>
  );
}) as React.ComponentType<any>

export default Shop