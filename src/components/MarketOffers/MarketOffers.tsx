import React, { useState } from 'react';
import styles from './marketoffers.css';
import image_1 from '../../public/img/major_4.png'
import CatalogProdCard from '../CatalogProdCard/CatalogProdCard';
import classnames from 'classnames'
import DeviceStore from '../../store/DeviceStore';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';


export const MarketOffers = observer(() => {
  
  const [category, setCategory] = useState('sales')

  const SALES = 'sales'
  const NEW = 'new'
  const TOP = 'top'


  const SALES_LIST_FILTER = toJS(DeviceStore.devices).filter((product) => {return (product.oldPrice)})

  const SALES_LIST = SALES_LIST_FILTER.map(({ id, name, description, price, oldPrice, img, count, brandName, default_color }) => {
    if (category === SALES) {
      return (
        <div key={id} className={styles.marketOffers__list_item}>
          <CatalogProdCard brandName={brandName} count={count} id={id} name={name} description={description} price={price} oldPrice={oldPrice} img={img} default_color={default_color} />
        </div>
      )
    }
  })

  const NEW_LIST_FILTER = toJS(DeviceStore.devices).filter((product) => {return (!product.oldPrice)})

  const NEW_LIST = NEW_LIST_FILTER.map(({ id, name, description, price, oldPrice, img, count, brandName, default_color }) => {
    if (category === NEW) {
      return (
        <div key={id} className={styles.marketOffers__list_item}>
          <CatalogProdCard brandName={brandName} count={count} id={id} name={name} description={description} price={price} oldPrice={oldPrice} img={img} default_color={default_color} />
        </div>
      )
    }
  })

  const TOP_LIST = toJS(DeviceStore.devices).map(({ id, name, description, price, oldPrice, img, count, brandName, default_color }) => {
    if (category === TOP) {
      return (
        <div key={id} className={styles.marketOffers__list_item}>
          <CatalogProdCard brandName={brandName} count={count} id={id} name={name} description={description} price={price} oldPrice={oldPrice} img={img} default_color={default_color} />
        </div>
      )
    }
  })

  const scrollBarIs = () => {
    if ((category === SALES && SALES_LIST.length <= 3) || (category === TOP && TOP_LIST.length <= 3) || (category === NEW && NEW_LIST.length <= 3)) {
      return classnames(styles.marketOffers__wrapper, styles.marketOffers__wrapper_sbInactive)
    } else return (styles.marketOffers__wrapper)
  }

  return (
    <div className={styles.marketOffers__outWrapper} id='new'>
      <nav className={styles.marketOffers__nav}>
        <button onClick={() => setCategory(SALES)} className={category === SALES ? classnames(styles.marketOffers__nav_btn, styles.marketOffers__nav_btn_active) : styles.marketOffers__nav_btn}>Скидки</button>
        <button onClick={() => setCategory(NEW)} className={category === NEW ? classnames(styles.marketOffers__nav_btn, styles.marketOffers__nav_btn_active) : styles.marketOffers__nav_btn}>Новинки</button>
        <button onClick={() => setCategory(TOP)} className={category === TOP ? classnames(styles.marketOffers__nav_btn, styles.marketOffers__nav_btn_active) : styles.marketOffers__nav_btn}>Топ продаж</button>
      </nav>
      <div className={scrollBarIs()}>
        <ul className={styles.marketOffers__list}>
          {SALES_LIST}
          {NEW_LIST}
          {TOP_LIST}
        </ul>
      </div>
    </div>
  );
})

