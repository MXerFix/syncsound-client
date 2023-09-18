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

interface CatalogProdCardI {
  id: number,
  name: string,
  description: string,
  price: number,
  oldPrice?: number,
  img: string,
}

const CatalogProdCard = observer(({ id, name, description, price, oldPrice, img }: CatalogProdCardI) => {

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
      <div onClick={() => { navigate( '../' + DEVICE_PAGE_ROUTE + '/' + id, {replace: false }) }} className={styles._card}>
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
            <h4 className={styles.card__text_name}> {name} </h4>
            <p className={styles.card__text_description}> {description.toUpperCase()} </p>
          </div>
        </div>
        <div className={styles.card__priceInfo}>
          <div className={styles.card__priceBox}>
            <p className={styles._price}> {price}₽ </p>
            <p className={styles._oldPrice}> {oldPrice ? oldPrice + '₽' : ''} </p>
          </div>
          <div className={styles.card__priceBox_cartBtn}>
            <InvertBtn className={` ${isMobile && ' text-16 py-2 px-3 w-max '} `} onClick={(e:any) => { e.stopPropagation() ; setBasket(!basket); return (basket ? BasketStore.removeBasketId(id) : BasketStore.addBasketId(id)) }} style={basket ? { backgroundColor: "white", border: '0', borderRadius: '32px', content: 'В корзине' } : { backgroundColor: "black", border: '0', borderRadius: '32px', content: 'В корзину' }}  > {basket ? 'В корзине' : 'В корзину'} </InvertBtn>
          </div>
        </div>
      </div>
  )
})

export default CatalogProdCard