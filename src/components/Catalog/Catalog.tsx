import React, { useEffect, useState } from 'react';
import styles from './catalog.css';
import major4_bl from '../../public/img/major_4_nofon.png'
import major4_bl_1 from '../../public/img/major4_bl_1.png'
import major4_bl_2 from '../../public/img/major4_bl_2.png'
import major4_bl_3 from '../../public/img/major4_bl_3.png'
import major4_br from '../../public/img/major4_br.png'
import major4_br_1 from '../../public/img/major4_br_1.png'
import major4_br_2 from '../../public/img/major4_br_2.png'
import major4_br_3 from '../../public/img/major4_br_3.png'
import emberton_1 from '../../public/img/emberton_nofon.png'
import major3_wh from '../../public/img/major3_wh.png'
import major2_br from '../../public/img/major2_br.png'
import mid_anc from '../../public/img/midANC.png'
import kublurn from '../../public/img/kulburn.png'
import CatalogProdCard from '../CatalogProdCard/CatalogProdCard';
import classnames from 'classnames'
import DeviceStore from '../../store/DeviceStore';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { isMobile } from '../../App';


export const Catalog = observer(() => {


  const productsList = toJS(DeviceStore.devices)

  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')


  return (
    <div id='catalog' className={styles.catalog_wrapper + ' mt-16'}>
      <h2 className='title_monts_contacts fz-48 mb-10 title-mobile'>Каталог</h2>
      <div className={styles.catalog__catalog_box}>
        <div className={styles.catalog__header}>
          <div className={styles.catalog__header_category}>
            <button className={category === 'all' ? classnames(styles.header__category_btn, styles.category__btn_active) : styles.header__category_btn} onClick={() => setCategory('all')}>Все категории</button>
            <button className={category === 'Наушники' ? classnames(styles.header__category_btn, styles.category__btn_active) : styles.header__category_btn} onClick={() => setCategory('Наушники')}>Наушники</button>
            <button className={category === 'Акустика' ? classnames(styles.header__category_btn, styles.category__btn_active) : styles.header__category_btn} onClick={() => setCategory('Акустика')}>Акустика</button>
          </div>
          <div className={styles.catalog__header_sort}>
            <span className={styles.catalog__sort_span}></span>
            <div className={styles.catalog__sort_dropdown} >

            </div>
          </div>
          <div className={styles.catalog__header_search}>
            <input onChange={(e) => setSearch(e.target.value)} placeholder='Поиск...' className={styles.catalog__search_input} type="text" />
          </div>
        </div>
        <div className={styles.catalog__products}>
          {category === 'all' && productsList.map(({ id, name, description, price, oldPrice, img }) => {
            if (name && name.toLowerCase().includes(search.toLowerCase())) {
              return (
                <div key={id} className={styles.catalog__product_item}>
                  <CatalogProdCard id={id} name={name} description={description} price={price} oldPrice={oldPrice} img={img} />
                </div>
              )
            }
          })}
          {category !== 'all' && productsList.map(({ id, name, description, price, oldPrice, img, categoryName }) => {
            if (categoryName === category && name && name.toLowerCase().includes(search.toLowerCase())) {
              return (
                <div key={id} className={styles.catalog__product_item}>
                  <CatalogProdCard id={id} name={name} description={description} price={price} oldPrice={oldPrice} img={img} />
                </div>
              )
            }
          })}
          {!productsList.filter((obj) => obj.name.toLowerCase().includes(search.toLowerCase())).length && !isMobile && <div className={styles.catalog_notFoundItem}><span className={styles.catalog_notFoundItem_text}>Извините, но устройства с названием<strong> {search} </strong>не нашлось...</span></div>}
        </div>
      </div>
    </div>
  );

})


