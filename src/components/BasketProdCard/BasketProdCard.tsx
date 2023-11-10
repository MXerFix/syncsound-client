import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { isMobile } from '../../App';
import BasketStore from '../../store/BasketStore';
import FavoritesStore from '../../store/FavoritesStore';
import InvertBtn from '../../UI/InvertBtn/InvertBtn';
import { API_URL } from '../../utils/consts';
import styles from './basketprodcard.css';
import * as Dialog from '@radix-ui/react-alert-dialog';
import { Flex } from '@radix-ui/themes';

interface BasketProdCardI {
  id: number,
  name: string,
  description: string,
  img: string,
  price: number,
  setSum: Function,
  oldPrice?: number,
}

const BasketProdCard = ({ id, name, description, img, price, oldPrice, setSum }: BasketProdCardI) => {

  const [counter, setCounter] = useState(1)
  const [prevCounter, setPrevCounter] = useState<number>(0)

  const [favorite, setFavorite] = useState(false)
  const [basket, setBasket] = useState(false)


  useEffect(() => {
    if (FavoritesStore.FAVORITES_LIST.filter((item: number) => { return item === id }).length) setFavorite(true)
  }, [favorite])

  useEffect(() => {
    if (BasketStore.BASKET_LIST.filter((item: number) => { return item === id }).length) setBasket(true)
  }, [basket])

  useEffect(() => {
    if (prevCounter > counter) {
      setSum((prev: number) => prev -= price)
    } else if (prevCounter < counter) {
      setSum((prev: number) => prev += price)
    }
  }, [counter])

  return (
    <div className={styles.bProdCard_wrapper}>
      <Dialog.Root>
        {!isMobile ? (
          <>
            <div className={styles.bProdCard_left}>
              <div className={styles.left__image_block}>
                <img className={styles.bProdCard_left_img} src={API_URL + '/' + img} alt={name} />
                {/* <img className={styles.bProdCard_left_img} src={img} alt={name} /> */}
                <span>{id}</span>
              </div>
              <div className={styles.left__name_block}>
                <div className={styles.left__name_block_name}>
                  <h4>{name}</h4>
                  <p>{description}</p>
                </div>
                <div className={styles.left__name_block_buttons}>
                  <InvertBtn onClick={() => { setFavorite(!favorite); return (favorite ? FavoritesStore.removeFavoriteId(id) : FavoritesStore.addFavoriteId(id)) }} style={favorite ? { fontSize: '12px', width: '120px', padding: '8px 10px', backgroundColor: 'white' } : { fontSize: '12px', width: '120px', padding: '8px 10px', backgroundColor: 'transparent' }}> {favorite ? 'В избранном' : 'В избранное'} </InvertBtn>
                  <Dialog.Trigger>
                    <InvertBtn style={{ fontSize: '12px', width: '120px', padding: '8px 10px', marginLeft: '8px' }}> Удалить </InvertBtn>
                  </Dialog.Trigger>
                </div>
              </div>
            </div>
            <div className={styles.bProdCard_right}>
              <div className={styles.prodCounter_box}>
                <button onClick={() => { counter === 1 ? setCounter(1) : setCounter(prev => { setPrevCounter(prev); return prev - 1 }) }} className={classNames(styles.counter_btn, styles.counter_minus)}> - </button>
                <p> {counter} </p>
                <button onClick={() => setCounter(prev => { setPrevCounter(prev); return prev + 1 })} className={classNames(styles.counter_btn, styles.counter_plus)}> + </button>
              </div>
              <div className={styles.prodPrice_box}>
                <span> {oldPrice ? oldPrice * counter + '₽' : ''} </span>
                <p>{price * counter} ₽</p>
              </div>
            </div>
          </>
        ) : (
          <div className='flex flex-row justify-between '>
            <div className='w-[50%] flex flex-col items-center justify-center'>
              <img className='w-full m-0' src={API_URL + '/' + img} alt="" />
              <span className='text-[#6c6c6c]'> {id} </span>
            </div>
            <div className='w-[50%] flex flex-col items-end justify-evenly '>
              <p className='mb-6 text-24'> {name} </p>
              <div className={styles.prodPrice_box}>
                <span> {oldPrice ? oldPrice * counter + '₽' : ''} </span>
                <p>{price * counter} ₽</p>
              </div>
              <div className={styles.left__name_block_buttons}>
                <InvertBtn onClick={() => { setFavorite(!favorite); return (favorite ? FavoritesStore.removeFavoriteId(id) : FavoritesStore.addFavoriteId(id)) }} style={favorite ? { fontSize: '12px', width: '120px', padding: '8px 10px', backgroundColor: 'white' } : { fontSize: '12px', width: '120px', padding: '8px 10px', backgroundColor: 'transparent' }}> {favorite ? 'В избранном' : 'В избранное'} </InvertBtn>
                <Dialog.Trigger >
                  <InvertBtn onClick={() => { }} style={{ fontSize: '12px', width: '120px', padding: '8px 10px', marginLeft: '8px' }}> Удалить </InvertBtn>
                </Dialog.Trigger>
              </div>
            </div>
          </div>
        )}
        <Dialog.Portal >
          <Dialog.Overlay
            className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0">
            <Dialog.Content
              className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-333 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Dialog.Title
                className="text-white m-0 text-[17px] font-medium">
                Удаление товара
              </Dialog.Title>
              <Dialog.Description
                className="text-neutral-300 mt-4 mb-5 text-[15px] leading-normal">
                Удалить выбранный товар? Отменить действие будет невозможно.
              </Dialog.Description>
              <div className='flex flex-row items-center justify-end gap-4'>
                <Dialog.Cancel
                  className="text-333 bg-mauve4 hover:bg-mauve5 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none">
                  Отмена
                </Dialog.Cancel>
                <Dialog.Action
                  className="text-white bg-red-500 hover:bg-red-600 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                  onClick={e => { setBasket(!basket); setSum((prev: number) => prev -= price); BasketStore.removeBasketId(id) }}>
                  Удалить
                </Dialog.Action>
              </div>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default BasketProdCard