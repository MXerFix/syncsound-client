import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import styles from './offerpage.css';
import { MobileFooter } from '../../components/Mobile/Footer';
import { Footer } from '../../components/Footer/Footer';
import { ScrollRestoration } from 'react-router-dom';
import { isMobile } from '../../App';
import { Contacts } from '../../components/Contacts';
import { get_offer } from '../../http/offerAPI';
import { Socials } from '../../components/Contacts/components/Socials';

export type offerType = {
  id: number
  createdAt: string
  address: string
  payment: string
  status: string
  sum: number
  updatedAt: string
  userEmail: string
  userId: number | null
  userName: string
  userTel: string
}

export type offerAddressType = {
  city: string
  pvz: string
  street: string
  house: string
  apartment: string
}

export function OfferPage({ offer_id, status }: { offer_id: string, status: string }) {

  const [offerData, setOfferData] = useState<offerType>()
  const [offerAddress, setOfferAddress] = useState<offerAddressType>()

  useEffect(() => {
    const getOfferData = async () => {
      try {
        const response = await get_offer(offer_id)
        console.log(response)
        setOfferData(response.offer)
        setOfferAddress(JSON.parse(response.offer.address))
        console.log(response.offer.address)
      } catch (error) {
        console.log(error)
      }
    }

    getOfferData()

  }, [])

  const payment_methods = {
    when_get: "При получении",
  }

  const SucceedOffer = () => {
    return (
      <div className=' flex flex-col items-center justify-center '>
        <h2 className='text-48 bg-green-500 px-4 py-1 text-white font-bold w-max rounded-lg mb-4 mt-12 shadow-xl'> Спасибо за покупку! </h2>
        <p className='text-white max-w-2xl text-center exo-2'>Ваш заказ успешно оплачен и принят в обработку! Как только заказу будет присвоен трек-номер, Вы получите уведомление на электронную почту! <br /> Приходите к нам еще! </p>
        <div className=' flex flex-row items-center w-full h-max justify-center mt-16' >
          <div className='w-1/3 py-6 px-6 flex flex-col items-center justify-between bg-[#131313] rounded-2xl min-h-[266px] exo-2 '>
            <a className=' bg-[#222] shadow-xl text-center rounded-lg my-2 w-full py-2 text-white text-24 ' href=""> Telegram </a>
            <a className=' bg-[#222] shadow-xl text-center rounded-lg my-2 w-full py-2 text-white text-24 ' href=""> WhatsApp </a>
            <a className=' bg-[#222] shadow-xl text-center rounded-lg my-2 w-full py-2 text-white text-24 ' href=""> Email </a>
          </div>
          <div className='w-1/2 bg-[#131313] text-white p-8 rounded-2xl ml-12 '>
            <div className=' flex flex-row justify-between '>
              <h3 className='text-24 mb-2' >Заказ №{offerData?.id} <span className={` px-2 rounded-lg ${offerData?.status === 'Создан' ? 'bg-yellow-400 text-[#131313] ' : 'bg-green-600'} `}> {offerData?.status} </span> </h3>
              <p className='text-24 mb-1'> Сумма: {offerData?.sum}₽ </p>
            </div>
            <p className='text-20 mb-1'> {offerData?.userName} </p>
            <p className='text-18 mb-1'> {offerData?.userEmail} </p>
            <p className='text-18 mb-1'> {offerData?.userTel} </p>
            <p className='text-18 mb-1'> Оплата <span className={` px-2 rounded-lg ${offerData?.payment === 'when_get' ? 'bg-yellow-400 text-[#131313] ' : "bg-green-600"} `}> {offerData?.payment === 'when_get' ? 'при получении' : "картой онлайн (ЮКасса)"} </span> </p>
            {offerAddress?.pvz ? (
              <p className='text-18 mb-1'> Пункт выдачи: {offerAddress?.pvz} </p>
            ) : (
              <p className='text-18 mb-1'> Адрес: {offerAddress?.city}, {offerAddress?.street}, {offerAddress?.house}, {offerAddress?.apartment}  </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  const ErrorOffer = () => {
    return (
      <div className=' flex flex-col items-center justify-center '>
        <h2 className='text-48 bg-red-500 px-4 py-1 text-white font-bold w-max rounded-lg mb-4 mt-12 shadow-xl'> Ошибка при создании заказа! </h2>
        <p className='text-white max-w-2xl text-center exo-2'> Пожалуйста, повторите попытку или обратитесь в нашу тех.поддержку для уточнения причин ошибки! </p>
        <div className=' flex flex-row items-center w-full h-max justify-center mt-16' >
          <div className='w-1/3 py-6 px-6 flex flex-col items-center justify-between bg-[#131313] rounded-2xl min-h-[266px] exo-2 '>
            <a className=' bg-[#222] shadow-xl text-center rounded-lg my-2 w-full py-2 text-white text-24 ' href=""> Telegram </a>
            <a className=' bg-[#222] shadow-xl text-center rounded-lg my-2 w-full py-2 text-white text-24 ' href=""> WhatsApp </a>
            <a className=' bg-[#222] shadow-xl text-center rounded-lg my-2 w-full py-2 text-white text-24 ' href=""> Email </a>
          </div>
          <div className='w-1/2 bg-[#131313] text-white p-8 rounded-2xl ml-12 '>
            <div className=' flex flex-row justify-between '>
              <h3 className='text-24 mb-2' >Заказ №{offerData?.id} <span className={` px-2 rounded-lg ${offerData?.status === 'Ошибка' ? 'bg-red-500 text-[#131313] ' : 'bg-green-600'} `}> {offerData?.status} </span> </h3>
              <p className='text-24 mb-1'> Сумма: {offerData?.sum}₽ </p>
            </div>
            <p className='text-20 mb-1'> {offerData?.userName} </p>
            <p className='text-18 mb-1'> {offerData?.userEmail} </p>
            <p className='text-18 mb-1'> {offerData?.userTel} </p>
            <p className='text-18 mb-1'> Оплата <span className={` px-2 rounded-lg ${offerData?.payment === 'when_get' ? 'bg-yellow-400 text-[#131313] ' : "bg-green-600"} `}> {offerData?.payment === 'when_get' ? 'при получении' : "картой онлайн (ЮКасса)"} </span> </p>
            {offerAddress?.pvz ? (
              <p className='text-18 mb-1'> Пункт выдачи: {offerAddress?.pvz} </p>
            ) : (
              <p className='text-18 mb-1'> Адрес: {offerAddress?.city}, {offerAddress?.street}, {offerAddress?.house}, {offerAddress?.apartment}  </p>
            )}
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className=' w-[100vw] h-[100vh] flex flex-col justify-center'>
      {status === 'succeed' ? <SucceedOffer /> : <ErrorOffer />}
      <a onClick={() => {
        localStorage.removeItem('offer_id');
        localStorage.removeItem('basket');
      }}
        href={process.env.REACT_APP_URL ?? "http://localhost:3210"}
        className=' bg-[#131313] w-max px-4 py-1 text-[#ddd] rounded-xl text-24 mt-12 mx-auto '
      >
        Вернуться в магазин
      </a>
    </div>
  );
}
