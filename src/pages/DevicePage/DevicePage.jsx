import classNames from 'classnames';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { ScrollRestoration, useLocation, useParams } from 'react-router-dom';
import { ucFirst } from '../..';
import { isMobile } from '../../App';
import { Header } from '../../components/Header';
import { MobileFooter } from '../../components/Mobile/Footer';
import Preloader from '../../components/Preloader/Preloader';
import { fetchBrands } from '../../http/brandsAPI';
import { fetchDevices, fetchOneDevice } from '../../http/deviceAPI';
import { fetchTypes } from '../../http/typesAPI';
import BasketStore from '../../store/BasketStore';
import BrandsStore from '../../store/BrandsStore';
import DeviceStore from '../../store/DeviceStore';
import FavoritesStore from '../../store/FavoritesStore';
import TypesStore from '../../store/TypesStore';
import InvertBtn from '../../UI/InvertBtn/InvertBtn';
import { API_URL, COLOR_BLACK, COLOR_BROWN, COLOR_GREY, COLOR_WHITE, EMBERTON, KULBURN, MAJOR_2, MAJOR_3, MAJOR_4, MID_ANC, PAGE_BLACK, PAGE_BROWN, PAGE_GREY, PAGE_WHITE } from '../../utils/consts';
import styles from './devicepage.css';
import Major4Add from './Major4Add/Major4Add';
import MinANCAdd from './MidANCAdd/MinANCAdd';
import { Footer } from '../../components/Footer/Footer';
import WillenAdd from './Willen/Willen';
import Emberton2Add from './Emberton2Add/Emberton2Add';
import { Woburn2Add } from './Woburn2Add/Woburn2Add';
import { Stanmore3Add } from './Stanmore3Add/Stanmore3Add';
import { Stanmore2Add } from './Stanmore2Add/Stanmore2Add';
import { Acton3Add } from './Acton3Add/Acton3Add';
import { Acton2Add } from './Acton2Add/Acton2Add';
import { MiddletonAdd } from './MiddletonAdd/MiddletonAdd';

function chooseColor(nativeColor) {
  switch (nativeColor) {
    case COLOR_BLACK: { return PAGE_BLACK; break }
    case COLOR_BROWN: { return PAGE_BROWN; break }
    case COLOR_GREY: { return PAGE_GREY; break }
    case COLOR_WHITE: { return PAGE_WHITE; break }
  }
}

function whatDevice(deviceName) {
  switch (deviceName) {
    case MAJOR_4: { return <Major4Add />; break }
    case MID_ANC: { return <MinANCAdd />; break }
    case "Willen": { return <WillenAdd />; break }
    case "Emberton 2": { return <Emberton2Add />; break }
    case "Woburn II": { return <Woburn2Add />; break }
    case "Stanmore III": { return <Stanmore3Add />; break }
    case "Stanmore II": { return <Stanmore2Add />; break }
    case "Acton II": { return <Acton2Add />; break }
    case "Acton III": { return <Acton3Add />; break }
    case "Middleton": { return <MiddletonAdd />; break }
  }
}




export const DevicePage = observer(() => {

  const params = useParams()
  const devicePageId = parseInt(params.id ? params.id : '')
  const [isLoading, setIsLoading] = useState(true)
  const [device, setDevice] = useState({ info: [{}], colors: [{}], paged_device: [{}], images_for_color: [{}] })

  useEffect(() => {
    fetchOneDevice(devicePageId).then(data => {
      setDevice(data)
      setTimeout(() => {
        setIsLoading(prev => false)
      }, 200);
    })
  }, [])

  const sortColorImagesFn = (images) => {
    console.log(images)
  }

  const [colorPage, setColorPage] = useState('')
  const [imgList, setImgList] = useState(([[{ img: '', color: colorPage }]]))
  const [mainImg, setMainImg] = useState('')

  useEffect(() => {
    console.log(device);
    // setImgList(device.images_for_color)
    setMainImg(API_URL + '/' + device.img)
    // setColorPage(device.colors[0].color)
    // sortColorImagesFn(device.images_for_color)
  }, [device])

  // const productsList = toJS(DeviceStore.devices)

  useEffect(() => {
    if (colorPage !== '') {
      setMainImg(API_URL + '/' + imgList.filter(({ color }) => color === colorPage)[0].img)
    }
  }, [colorPage])


  // console.log(productsList)

  // const device = productsList.filter((item) => { return item.id == devicePageId })[0]
  // console.log(device);

  const charactersList = device.info

  // const [color, setColor] = useState(device.colors[0])
  const [favorite, setFavorite] = useState(false)
  const [basket, setBasket] = useState(false)

  useEffect(() => {
    if (FavoritesStore.FAVORITES_LIST.filter((item) => { return item === device.id }).length) setFavorite(true)
  }, [favorite])

  useEffect(() => {
    if (BasketStore.BASKET_LIST.filter((item) => { return item === device.id }).length) setBasket(true)
  }, [basket])


  if (!isLoading) {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div className='content'>
          <div className={styles.deviceBanner + ' pt-12 pb-6'}>
            <div className={styles.deviceBanner_in + ' w-full max-w-[1920px] '}>
              <div className={styles.rightSide}>
                <div className={styles.rightSide_nameBlock}>
                  <h1> {ucFirst(device.brandName)} {device.name} </h1>
                  <p> {device.paged_device[0].bigDescription} </p>
                </div>
                <div className={styles.rightSide_colorANDprice + ' '}>
                  {/* <div className={styles.colorANDprice_color}>
                  Цвет:
          
                </div> */}
                  <div className={styles.colorANDprice_price}>
                    <p className='text-64'>
                      <span> {device.oldPrice ? device.oldPrice + '₽' : ''}  </span>
                      {device.price}₽
                    </p>
                  </div>
                </div>
                <div className={styles.rightSide_buttonsBlock}>
                  <div><InvertBtn onClick={() => { setBasket(!basket); return (basket ? BasketStore.removeBasketId(device.id) : BasketStore.addBasketId(device.id)) }} className={basket ? 'br-32 let-spacing-01 bg-color_white' : 'br-32 let-spacing-01'}> {basket ? 'В корзине' : 'В корзину'} </InvertBtn></div>
                  <div><InvertBtn onClick={() => { setFavorite(!favorite); return (favorite ? FavoritesStore.removeFavoriteId(device.id) : FavoritesStore.addFavoriteId(device.id)) }} className={favorite ? 'br-32 let-spacing-01 bg-color_white' : 'br-32 let-spacing-01'} > {favorite ? 'В избранном' : 'В избранное'} </InvertBtn></div>
                </div>
              </div>
              <div className={styles.leftSide}>
                <div>
                  {/* <div className={styles.img_main} > */}
                  <img src={mainImg} className='scale-110 bg-[rgba(255,255,255,0.025)] rounded-3xl ' alt="" />
                  {/* </div> */}
                  {/* <div className={styles.img_swiper}>
                  {imgList.filter(({color}) => color === colorPage).map((item) =>
                    <div onClick={() => setMainImg(API_URL + item.img)} key={item.id} className={(item.img == mainImg ? classNames(styles.img_swiped, styles.img_active) : styles.img_swiped)} >
                      <img src={API_URL + item.img} alt="" />
                    </div>
                  )}
                </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.add_block}>
            {whatDevice(device.name)}
          </div>
          <div className={styles.characters}>
            <h2 className={styles.technical_characters_h2 + ' mb-10'}> ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ </h2>
            <div className={styles.technical_characters}>
              {charactersList.map((infoItem) =>
                <div key={infoItem.id} className={styles.characters_item}>
                  <p className={styles.item_h}> {infoItem.title}: </p>
                  <p> {infoItem.description} </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {isMobile ? <MobileFooter /> : <Footer />}
        <ScrollRestoration />
      </div>
    );
  } else {
    return (
      <Preloader />
    )
  }

})