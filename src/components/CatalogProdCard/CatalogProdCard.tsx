import React, { useEffect, useState } from 'react'
import InvertBtn from '../../UI/InvertBtn/InvertBtn'
import styles from './catalogprodcard.css'
import classnames from 'classnames'
import FavoritesStore from '../../store/FavoritesStore'
import BasketStore from '../../store/BasketStore'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL, DEVICE_PAGE_ROUTE } from '../../utils/consts'
import { isMobile } from '../../App'
import { ucFirst } from '../..'
import { TrashIcon } from '@radix-ui/react-icons'
import { Cart } from '../../icons/Cart'

interface CatalogProdCardI {
  id: number,
  name: string,
  brandName: string,
  description: string,
  price: number,
  oldPrice?: number,
  img: string,
  count: number
}

const CatalogProdCard = observer(({ id, name, description, price, oldPrice, img, count, brandName }: CatalogProdCardI) => {

  const [favorite, setFavorite] = useState(false)
  const [basket, setBasket] = useState(false)


  // useEffect(() => {
  //   if (FavoritesStore.favoritesList.filter((item: number) => { return item === id }).length) { setFavorite(true) }
  // }, [])

  // useEffect(() => {
  //   if (BasketStore.basketList.filter((item: number) => { return item === id }).length) setBasket(true)
  // }, [])

  useEffect(() => {
    if (FavoritesStore.FAVORITES_LIST.includes(id)) setFavorite(true)
    else if (!FavoritesStore.FAVORITES_LIST.includes(id)) setFavorite(false)
  }, [FavoritesStore.FAVORITES_LIST])

  useEffect(() => {
    if (BasketStore.BASKET_LIST.includes(id)) setBasket(true)
    else if (!BasketStore.BASKET_LIST.includes(id)) setBasket(false)
  }, [BasketStore.BASKET_LIST])

  const navigate = useNavigate()


  return (
    <div onClick={() => { navigate('../' + DEVICE_PAGE_ROUTE + '/' + id, { replace: false }) }} className={styles._card}>
      <div className={styles.card__mainInfo}>
        <div className={styles.card__mainInfo_img}>
          <img src={API_URL + '/' + img} alt="" />
          {/* <img src={img} alt="" /> */}
          <button onClick={(e) => { e.stopPropagation(); setFavorite(!favorite); return (favorite ? FavoritesStore.removeFavoriteId(id) : FavoritesStore.addFavoriteId(id)) }} className={favorite ? classnames(styles.favorite__btn, styles.favorite__btn_active) : styles.favorite__btn}>
            <svg width="40" height="37" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className={styles.heart_svg_1} d="M21.178 35.823C20.532 36.059 19.468 36.059 18.822 35.823C13.312 33.8764 1 25.7556 1 11.9916C1 5.91572 5.731 1 11.564 1C15.022 1 18.081 2.73034 20 5.40449C21.919 2.73034 24.997 1 28.436 1C34.269 1 39 5.91572 39 11.9916C39 25.7556 26.688 33.8764 21.178 35.823Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path className={favorite ? classnames(styles.heart_svg_2, styles.heart_svg_2_active) : styles.heart_svg_2} d="M21.178 35.823C20.532 36.059 19.468 36.059 18.822 35.823C13.312 33.8764 1 25.7556 1 11.9916C1 5.91572 5.731 1 11.564 1C15.022 1 18.081 2.73034 20 5.40449C21.919 2.73034 24.997 1 28.436 1C34.269 1 39 5.91572 39 11.9916C39 25.7556 26.688 33.8764 21.178 35.823Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className={styles.card__mainInfo_text}>
          <h4 className={styles.card__text_name}> {isMobile ? (
            <> <span className='m-0 p-0 block'> {brandName} </span><span className='text-16 m-0 p-0 block'> {name} </span></>
          ) : (
            <>{brandName} {name}</>
          )} </h4>
          <p className={styles.card__text_description}> {description.toUpperCase()} </p>
        </div>
      </div>
      <div className={styles.card__priceInfo + ' ' + `${count === 0 && isMobile && 'justify-start items-start'}`}>
        {(count !== 0 || !isMobile) && (
          <div className={styles.card__priceBox}>
            <p className={styles._price}> {price}₽ </p>
            <p className={styles._oldPrice}> {oldPrice ? oldPrice + '₽' : ''} </p>
          </div>
        )}
        <div className={classnames(styles.card__priceBox_cartBtn, 'flex flex-row items-end justify-end gap-2')}>
          {count ? (
            <>
              {basket && (
                <button
                  className={`flex items-center justify-center ${isMobile ? 'w-12 h-12 rounded-2xl ' : 'p-[18px] rounded-3xl'} bg-red-400`}
                  onClick={e => {
                    e.stopPropagation();
                    // e.preventDefault()
                    BasketStore.removeBasketId(id)
                    setBasket(!basket)
                  }} >
                  <TrashIcon color='white' className={isMobile ? 'w-6 h-6' : 'w-10 h-10'} />
                </button>
              )}
              <InvertBtn
                className={` ${isMobile && ' text-16 py-2 px-3 w-max h-12 '} ${isMobile && basket && 'w-12 h-12 rounded-2xl'} `}
                onClick={(e: any) => {
                  e.stopPropagation();
                  // e.preventDefault()
                  if (!basket) {
                    setBasket(!basket);
                    BasketStore.addBasketId(id)
                    // BasketStore.removeBasketId(id)
                  } else {
                    navigate('/basket')
                  }
                }}
                style={basket ? { backgroundColor: "white", border: '0', borderRadius: `${isMobile ? '' : '24px'}`, content: 'В корзине' } : { backgroundColor: "black", border: '0', borderRadius: '32px', content: 'В корзину' }}
              >
                {basket ? <Cart className={isMobile ? 'w-6 h-6' : 'w-9 h-9'} /> : 'В корзину'}
              </InvertBtn>
            </>
          ) : (
            <InvertBtn className={`w-max px-4 rounded-[32px] ${isMobile && ' text-16 py-2 px-3 w-max h-12 '} `} onClick={(e: any) => e.stopPropagation()} >
              <a href="#contacts" className=''>Нет в наличии</a>
            </InvertBtn>
          )}
        </div>
      </div>
    </div>
  )
})


export default CatalogProdCard