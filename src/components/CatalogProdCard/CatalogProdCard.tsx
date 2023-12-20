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
import { ArrowRightIcon, TrashIcon } from '@radix-ui/react-icons'
import { Cart } from '../../icons/Cart'
import * as Tooltip from '@radix-ui/react-tooltip'
import { YooKassa } from '../../icons/YooKassa'

interface CatalogProdCardI {
  id: number,
  name: string,
  brandName: string,
  description: string,
  price: number,
  oldPrice?: number,
  img: string,
  count: number
  default_color: any
}

const CatalogProdCard = observer(({ id, name, description, price, oldPrice, img, count, brandName, default_color }: CatalogProdCardI) => {

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

  console.log(default_color.value.split(';'))


  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <div onClick={() => {
          navigate('../' + DEVICE_PAGE_ROUTE + '/' + id, { replace: false })
        }} className={styles._card}>
          {/* <div className={styles.out_card}>
          <button className=' flex flex-row items-center justify-center gap-1 '>
            Подробнее о товаре <ArrowRightIcon />
          </button>
          <div>
            
          </div>
        </div> */}
          <div className={styles.in_card}>
            <div className={styles.card__mainInfo}>
              <div className={styles.card__mainInfo_img}>
                <img src={API_URL + '/' + img} className='z-50' alt="" />
                {/* <img src={img} alt="" /> */}
                <button onClick={(e) => { e.stopPropagation(); setFavorite(!favorite); return (favorite ? FavoritesStore.removeFavoriteId(id) : FavoritesStore.addFavoriteId(id)) }} className={favorite ? classnames(styles.favorite__btn, styles.favorite__btn_active) : styles.favorite__btn}>
                  <svg width="48" height="42" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={styles.heart_svg_1} d="M29.3333 19.3333C31.8167 16.9 34.3333 13.9833 34.3333 10.1667C34.3333 7.73552 33.3676 5.40394 31.6485 3.68485C29.9294 1.96577 27.5978 1 25.1667 1C22.2333 1 20.1667 1.83333 17.6667 4.33333C15.1667 1.83333 13.1 1 10.1667 1C7.73552 1 5.40394 1.96577 3.68485 3.68485C1.96577 5.40394 1 7.73552 1 10.1667C1 14 3.5 16.9167 6 19.3333L17.6667 31L29.3333 19.3333Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path className={favorite ? classnames(styles.heart_svg_2, styles.heart_svg_2_active) : styles.heart_svg_2} d="M29.3333 19.3333C31.8167 16.9 34.3333 13.9833 34.3333 10.1667C34.3333 7.73552 33.3676 5.40394 31.6485 3.68485C29.9294 1.96577 27.5978 1 25.1667 1C22.2333 1 20.1667 1.83333 17.6667 4.33333C15.1667 1.83333 13.1 1 10.1667 1C7.73552 1 5.40394 1.96577 3.68485 3.68485C1.96577 5.40394 1 7.73552 1 10.1667C1 14 3.5 16.9167 6 19.3333L17.6667 31L29.3333 19.3333Z" fill="#FF4A4A" stroke="#FF4A4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    {/* <path className={styles.heart_svg_1} d="M21.178 35.823C20.532 36.059 19.468 36.059 18.822 35.823C13.312 33.8764 1 25.7556 1 11.9916C1 5.91572 5.731 1 11.564 1C15.022 1 18.081 2.73034 20 5.40449C21.919 2.73034 24.997 1 28.436 1C34.269 1 39 5.91572 39 11.9916C39 25.7556 26.688 33.8764 21.178 35.823Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> */}
                    {/* <path className={favorite ? classnames(styles.heart_svg_2, styles.heart_svg_2_active) : styles.heart_svg_2} d="M21.178 35.823C20.532 36.059 19.468 36.059 18.822 35.823C13.312 33.8764 1 25.7556 1 11.9916C1 5.91572 5.731 1 11.564 1C15.022 1 18.081 2.73034 20 5.40449C21.919 2.73034 24.997 1 28.436 1C34.269 1 39 5.91572 39 11.9916C39 25.7556 26.688 33.8764 21.178 35.823Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> */}
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
              <Tooltip.Portal>
                <Tooltip.Content className='bg-[#dfdfdf] text-333 transition-all animation-tooltip rounded-lg p-1 mb-1'>
                  {default_color.name}
                </Tooltip.Content>
              </Tooltip.Portal>
              <Tooltip.Trigger
                className={classnames(styles.card__color_ring, 'block rounded-full border border-transparent w-10 h-10 SHADOWWWWW')}
                style={{
                  background: default_color.value.split(';').length >= 2 ? `linear-gradient(to right, ${default_color.value.split(';')[0]} 50%, ${default_color.value.split(';')[1]} 50%)` : default_color.value,
                  borderWidth: '1.5px',
                  borderColor: 'white',
                }}
              >
              </Tooltip.Trigger>
            </div>
            <div className={styles.card__priceInfo + ' ' + `${count === 0 && isMobile && 'justify-center items-start'}`}>
              {((count === 0 && !isMobile) || (count !== 0)) ? (
                <div className={styles.card__priceBox}>
                  <p className={styles._price}> {price}₽ </p>
                  <p className={styles._oldPrice}> {oldPrice ? oldPrice + '₽' : ''} </p>
                </div>
              ) : <></>}
              <div className={classnames(styles.card__priceBox_cartBtn, 'flex flex-row items-end justify-end gap-2')}>
                {count ? (
                  <>
                    {basket && (
                      <button
                        className={`flex items-center justify-center ${isMobile ? 'w-10 h-10 rounded-xl ' : 'px-[18px] py-[12px] rounded-3xl'} bg-red-400`}
                        onClick={e => {
                          e.stopPropagation();
                          // e.preventDefault()
                          BasketStore.removeBasketId(id)
                          setBasket(!basket)
                        }} >
                        <TrashIcon color='white' className={isMobile ? 'w-4 h-4' : 'w-9 h-9'} />
                      </button>
                    )}
                    <InvertBtn
                      className={` ${isMobile && ' text-14 py-2 px-2.5 w-max h-10 '} ${isMobile && basket && 'w-10 h-10 rounded-xl'} `}
                      onClick={(e: any) => {
                        e.stopPropagation();
                        if (!basket) {
                          setBasket(!basket);
                          BasketStore.addBasketId(id)
                        } else {
                          navigate('/basket')
                        }
                      }}
                      style={basket ? { backgroundColor: "white", border: '1px solid', borderRadius: `${isMobile ? '' : '24px'}`, content: 'В корзине' } : { backgroundColor: "black", border: '1px solid', borderRadius: `${isMobile ? '16px' : '24px'}`, content: 'В корзину' }}
                    >
                      {basket ? <Cart className={isMobile ? 'w-4 h-4' : 'w-9 h-9'} /> : 'В корзину'}
                    </InvertBtn>
                  </>
                ) : (
                  <InvertBtn className={`w-max px-4 rounded-[24px] ${isMobile && ' text-14 rounded-[16px] py-2 px-1 w-max h-10 '} `} onClick={(e: any) => e.stopPropagation()} >
                    <a href="#contacts" className=''>Нет в наличии</a>
                  </InvertBtn>
                )}
              </div>
            </div>
          </div>
          <div className={styles.out_card}>
            <button className={styles.out_card__button}>
              <p>Подробнее о товаре</p>
              <ArrowRightIcon strokeWidth={4} className={styles.arrow} />
            </button>
            <YooKassa />
          </div>
        </div>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
})


export default CatalogProdCard