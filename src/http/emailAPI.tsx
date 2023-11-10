import React from 'react';
import { renderToString } from 'react-dom/server'
import { $host, $authHost } from './index';
import { PAYMENT__WHEN_GET } from '../pages/Basket';

export type emailDeviceType = {
  id: string
  name: string
  price: string
}

type EmailToMeType = {
  offer_id: string | null | number,
  name: string,
  email: string,
  tel: string,
  town: string,
  pvzAddress: string,
  postIndex: string,
  street: string,
  house: string,
  apartment: string,
  payment: {type: string, yooID: string, id: string},
  sum: number,
  devices: emailDeviceType[]
  delivery_price?: number
}

type EmailDataType = {
  to: string[]
  subject: string
}

export const send_offer_to_me = async (emailData: EmailDataType, emailHTMLData: EmailToMeType) => {

  const EmailHTML = () => {
    return (
      <div>
        <h2>Новый заказ {emailHTMLData.offer_id}</h2>
        <p> Имя: {emailHTMLData.name} </p>
        <p> Email: {emailHTMLData.email} </p>
        <p> Номер телефона: {emailHTMLData.tel} </p>
        <p> Город: {emailHTMLData.town} </p>
        <p> ПВЗ: {emailHTMLData.pvzAddress} </p>
        <p> Индекс: {emailHTMLData.postIndex} </p>
        <p> Адрес: {emailHTMLData.street} {emailHTMLData.house}, {emailHTMLData.apartment} </p>
        <p> Способ оплаты: {(emailHTMLData.payment.type == PAYMENT__WHEN_GET ? "При получении" : `Картой (ЮКасса) yooID=${emailHTMLData.payment.yooID} ID=${emailHTMLData.payment.id} `)} </p>
        <p> Сумма заказа: {emailHTMLData.sum} </p>
        <p> Доставка: { emailHTMLData.delivery_price } </p>
        <ul>
          {emailHTMLData.devices.map((device) => (
            <li>
              <p> ID: {device.id}</p>
              <p> NAME: {device.name}</p>
              <p> PRICE: {device.price}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  try {
    const { data } = await $host.post('/api/email/me', { emailHTML: renderToString(<EmailHTML />), emailData: { to: emailData.to, subject: emailData.subject } })
    return data
  } catch (error: any) {
    if (error.status != 504) {
      console.log(error)
    }
  }
}

export const send_offer_to_user = async (emailData: EmailDataType, emailHTMLData: { offer_id: string, name: string, devices: any[], sum: number, payment: string, pvzAddress: string, delivery_price: number  }) => {

  const EmailHTML = () => {
    return (
      <div>
        <h2>Заказ на SyncSound.ru <strong>№{emailHTMLData.offer_id}</strong> </h2>
        <div>
          <p>Добрый день, <strong>{emailHTMLData.name}</strong>!</p>
          <p>Ваш заказ на SyncSound.ru успешно создан! Наш менеджер свяжется с Вами в ближайшее время для подтверждения заказа.</p>
          <h4>Состав заказа:</h4>
          <ul>
            {emailHTMLData.devices.map((device) => (
              <li>
                <p> Marshall {device.name}</p>
                <p> Стоимость: {device.price}₽</p>
              </li>
            ))}
          </ul>
          <h4> Сумма заказа: {emailHTMLData.sum} </h4>
          <h5> Доставка: {emailHTMLData.delivery_price} </h5>
          <h4> Способ оплаты: {(emailHTMLData.payment == PAYMENT__WHEN_GET ? "При получении" : "Картой (ЮКасса)")} </h4>
          <h4> {emailHTMLData.pvzAddress ? ` Доставка в пункт выдачи: ${emailHTMLData.pvzAddress} ` : "Доставка: Курьером"} </h4>
        </div>
        <p>Благодарим за заказ, </p>
        <p>С уважением, команда syncsound!</p>
        <span> Это письмо сформировано автоматически. Просьба, не отвечать на него. По всем вопросам обращайтесь на syncsoundshop@gmail.com. </span>
      </div>
    )
  }

  try {
    const { data } = await $host.post('/api/email/me', { emailHTML: renderToString(<EmailHTML />), emailData: { to: emailData.to, subject: emailData.subject } })
    return data
  } catch (error: any) {
    if (error.status != 504) {
      console.log(error)
    }
  }
}

export const send_confirmation = async (emailData: EmailDataType, emailHTMLData: { confirmation: string }) => {

  const EmailHTML = () => {
    return (
      <div className='bg-neutral-500 w-full flex flex-col font-sans items-center justify-center p-8'>
        <div className='bg-white flex flex-col py-4 px-6 justify-start items-start shadow-xl rounded-lg'>
          <h2 className='font-semibold text-32 w-max mx-auto'> Код подтверждения </h2>
          <p className='w-max mx-auto text-24'> <strong>{emailHTMLData.confirmation}</strong> </p>
          <p>С уважением, команда syncsound!</p>
          <span> Это письмо сформировано автоматически. Просьба, не отвечать на него. По всем вопросам обращайтесь на syncsoundshop@gmail.com. </span>
        </div>
      </div>
    )
  }

  try {
    const { data } = await $host.post('/api/email/me', { emailHTML: renderToString(<EmailHTML />), emailData: { to: emailData.to, subject: emailData.subject } })
    return data
  } catch (error: any) {
    if (error.status != 504) {
      console.log(error)
    }
  }
}

export const send_track_number = async (emailData: EmailDataType, emailHTMLData: { offer_id: string, name: string, sum: number, payment: string, delivery_price: number, track_number: string  }) => {

  const EmailHTML = () => {
    return (
      <div>
        <h2>Заказ на SyncSound.ru <strong>№{emailHTMLData.offer_id}</strong> </h2>
        <div>
          <p>Добрый день, <strong>{emailHTMLData.name}</strong>!</p>
          <p>Спешим сообщить, что Ваш заказ №{emailHTMLData.offer_id} передан в доставку!</p>
          <h5> Трек-номер: <span className='font-bold'> {emailHTMLData.track_number} </span> </h5>
          <p> Вы можете отследить свой заказ по <a href="https://boxberry.ru/tracking-page">ссылке</a> </p>
          <h4> Сумма заказа: {emailHTMLData.sum} </h4>
          <h5> Доставка: {emailHTMLData.delivery_price} </h5>
          <h4> Способ оплаты: {(emailHTMLData.payment == PAYMENT__WHEN_GET ? "При получении" : "Картой (ЮКасса)")} </h4>
        </div>
        <p>С уважением, команда syncsound!</p>
        <span> Это письмо сформировано автоматически. Просьба, не отвечать на него. По всем вопросам обращайтесь на syncsoundshop@gmail.com. </span>
      </div>
    )
  }

  try {
    const { data } = await $host.post('/api/email/me', { emailHTML: renderToString(<EmailHTML />), emailData: { to: emailData.to, subject: emailData.subject } })

    return data
  } catch (error: any) {
    if (error.status != 504) {
      console.log(error)
    }
  }
}