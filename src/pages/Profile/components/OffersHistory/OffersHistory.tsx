import React from 'react';
import { CREATED, FINISHED, OFFER_ERROR, PROCESSING, VALIDATING } from '../../../../offerStatus';
import styles from './offershistory.css';
import classnames from 'classnames'


const offerList = [

  {
    offerInfo: {
      id: 12345,
      status: VALIDATING,
      date: '11 сентября 2001',
      products: [
        { id: 4439527, name: 'KubBurn II', price: 24390, count: 2 },
        { id: 5132312, name: 'Marshall Major II', price: 8590, count: 11 },
      ]
    }
  },

  {
    offerInfo: {
      id: 12346,
      status: PROCESSING,
      date: '12 декабря 2012',
      products: [
        { id: 1423235, name: 'Marshall Major V', price: 19990, count: 1 },
        { id: 2495768, name: 'Marshall A.N.C', price: 15990, count: 4 }
      ]
    }
  },

  {
    offerInfo: {
      id: 12347,
      status: FINISHED,
      date: '21 июня 1941',
      products: [
        { id: 2495768, name: 'Marshall A.N.C', price: 15990, count: 3 },
        { id: 3345872, name: 'Emberton', price: 11990, count: 2 },
      ]
    }
  },

]




function styleValidating(status: string) {
  let style
  switch (status) {
    case CREATED:
      return style = styles.CREATED_OFFER
      break;
    case VALIDATING:
      return style = styles.VALIDATING_OFFER
      break;
    case PROCESSING:
      return style = styles.PROCESSING_OFFER
      break;
    case FINISHED:
      return style = styles.FINISHED_OFFER
      break;
    case OFFER_ERROR:
      return style = styles.ERROR_OFFER
      break;
  }
  return style
}

export function OffersHistory() {
  return (
    <div className={styles.offerHistory__wrapper}>
      <h2 className={styles.offerHistory__title}>История заказов</h2>

      <ul>
        <li className={styles.li__body_ex + ' ' + styles.offerHistory_li} >
          <p className={styles.li__body_name} >
            Наименование
          </p>
          <p className={styles.li__body_productID} >
            Код товара
          </p>
          <p className={classnames(styles.li__head_offerSUM, styles.li__body_price)}>
            Цена, р
          </p>
          <p className={styles.li__body_productCOUNT}>
            Количество, шт
          </p>
          <p className={classnames(styles.li__head_offerSUM, styles.li__body_total)}>
            Стоимость, р
          </p>
        </li>
        {offerList.map(({ offerInfo }) => {
          return (
            <li className={styles.offerList_li + ' ' + styles.offerHistory_li} key={offerInfo.id}>
              <div className={styles.offerList__li_head}>
                <div>
                  <p className={styles.li__head_offerDATE} > Заказ от {offerInfo.date} </p>
                  <p className={styles.li__head_offerID} > №{offerInfo.id} </p>
                </div>
                <div>
                  <p className={styles.li__head_offerSUM} > Сумма: {offerInfo.products.reduce((p, obj) => { return p + obj.price * obj.count }, 0)}р </p>
                  <p className={classnames(styleValidating(offerInfo.status), styles.offer_status)}> {offerInfo.status} </p>
                </div>
              </div>
              <ul className={styles.offerList__li_body}>
                {offerInfo.products.map(({ id, name, price, count }) =>
                  <li key={id} className={styles.offerHistory_li}>
                    <p className={styles.li__body_name} >
                      {name}
                    </p>
                    <p className={styles.li__body_productID} >
                      {id}
                    </p>
                    <p className={classnames(styles.li__head_offerSUM, styles.li__body_price)}>
                      {price}р
                    </p>
                    <p className={styles.li__body_productCOUNT}>
                      {count}шт
                    </p>
                    <p className={classnames(styles.li__head_offerSUM, styles.li__body_total)}>
                      {price * count}р
                    </p>
                  </li>
                )}
              </ul>
            </li>
          )
        }
        )}
      </ul>
    </div>
  );
}
