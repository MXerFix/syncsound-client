import classNames from 'classnames';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { fetchBrands } from '../../http/brandsAPI';
import { fetchDevices } from '../../http/deviceAPI';
import { fetchTypes } from '../../http/typesAPI';
import BrandsStore from '../../store/BrandsStore';
import DeviceStore from '../../store/DeviceStore';
import TypesStore from '../../store/TypesStore';
import UserStore from '../../store/UserStore';
import InvertBtn from '../../UI/InvertBtn/InvertBtn';
import styles from './admin.css';
import { AddBrand } from './components/AddBrand/AddBrand';
import { AddDevice } from './components/AddDevice/AddDevice';
import { AddType } from './components/AddType/AddType';
import { SomeList } from './components/SomeList/SomeList';
import { AddColor } from './components/AddColor/AddColor';
import { fetchColors } from '../../http/colorsApi';
import ColorsStore from '../../store/ColorsStore';
import { check_admin_key } from '../../http/userAPI';
import ErrorStore from '../../store/ErrorStore';
import { ERROR_ALERT } from '../../components/ErrorModal/ErrorModal';
import * as Dialog from '@radix-ui/react-dialog'
import { get_all_offers } from '../../http/offerAPI';
import OffersStore from '../../store/OffersStore';

export const BRAND_LIST = 'brand_list'
export const DEVICE_LIST = 'device_list'
export const TYPE_LIST = 'type_list'
export const OFFERS_LIST = 'offers_list'
export const COLOR_LIST = 'color_list'



export const Admin = observer(() => {


  useEffect(() => {
    fetchTypes().then(data => TypesStore.setTypes(data))
    fetchBrands().then(data => BrandsStore.setBrands(data))
    fetchDevices().then(data => DeviceStore.setDevices(data))
    fetchColors().then(data => ColorsStore.setColors(data))
    get_all_offers().then(data => OffersStore.setOffers(data))
  }, [])


  // console.log(toJS(TypesStore.types))
  // console.log(toJS(BrandsStore.brands))
  // console.log(toJS(DeviceStore.devices))
  // console.log(toJS(ColorsStore.colors))


  const IS_ADMIN = UserStore._user.role === 'ADMIN'

  const [isKey, setIsKey] = useState(true)
  const [key, setKey] = useState('')


  const [anyForm, setAnyForm] = useState(false)
  const [colorForm, setColorForm] = useState(false)
  const [deviceForm, setDeviceForm] = useState(false)
  const [brandForm, setBrandForm] = useState(false)
  const [typeForm, setTypeForm] = useState(false)
  const [offerList, setOfferList] = useState(false)
  const [colorList, setColorList] = useState(false)
  const [someList, setSomeList] = useState('')
  const [list, setList] = useState(false)

  useEffect(() => {
    fetchTypes().then(data => TypesStore.setTypes(data))
    fetchBrands().then(data => BrandsStore.setBrands(data))
    fetchDevices().then(data => DeviceStore.setDevices(data))
    fetchColors().then(data => ColorsStore.setColors(data))
    get_all_offers().then(data => OffersStore.setOffers(data))
  }, [anyForm, someList])

  const cancelAdd = (e: any) => {
    e.preventDefault()
    setList(false)
    setBrandForm(false)
    setDeviceForm(false)
    setTypeForm(false)
    setSomeList('')
    setOfferList(false)
    setColorList(false)
    setColorForm(false)
    setAnyForm(false)
  }

  const checkKeyHandler = async () => {
    const data = await check_admin_key(key)
    if (data.correct) {
      setIsKey(true)
    } else {
      ErrorStore.setError(ERROR_ALERT, "Incorrect key!")
    }
  }


  if (!isKey) {
    return (
      <div className=' flex flex-col w-full h-[90vh] items-center justify-center gap-2 '>
        <label className=' text-white ' htmlFor="">KEY</label>
        <input className=' rounded py-1 px-2 ' type="text" value={key} onChange={e => setKey(e.target.value)} />
        <button className=' text-[#222] bg-white rounded py-1 px-2 ' onClick={e => checkKeyHandler()} > Login </button>
      </div>
    )
  } else {
    if (!IS_ADMIN) {
      return (
        <div>
          <div>
            <Header />
          </div>
          <div className='content'>
            У вас нет доступа к этому разделу
          </div>
        </div>
      )
    } else if (IS_ADMIN) {
      return (
        <>
          <div>
            <div>
              <Header />
            </div>
            <div className='content'>
              {!anyForm && (
                <div className={anyForm ? classNames(styles.content_box, styles.content_box_disabled) : styles.content_box} >
                  <div className={styles.menu_button__box}>
                    <InvertBtn className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} onClick={() => { setDeviceForm(true); setAnyForm(true) }} > Добавить устройство </InvertBtn>
                    <InvertBtn className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} onClick={() => { setBrandForm(true); setAnyForm(true) }} > Добавить бренд </InvertBtn>
                    <InvertBtn className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} onClick={() => { setTypeForm(true); setAnyForm(true) }} > Добавить категорию </InvertBtn>
                    <InvertBtn className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} onClick={() => { setColorForm(true); setAnyForm(true) }} > Добавить шаблон цвета </InvertBtn>
                  </div>
                  <div className={styles.menu_button__box}>
                    <InvertBtn onClick={() => { setSomeList(DEVICE_LIST); setAnyForm(true) }} className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} > Список устройств </InvertBtn>
                    <InvertBtn onClick={() => { setSomeList(BRAND_LIST); setAnyForm(true) }} className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} > Список брендов </InvertBtn>
                    <InvertBtn onClick={() => { setSomeList(TYPE_LIST); setAnyForm(true) }} className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} > Список категорий </InvertBtn>
                    <InvertBtn onClick={() => { setSomeList(COLOR_LIST); setAnyForm(true) }} className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} > Список цветов </InvertBtn>
                    <InvertBtn onClick={() => { setSomeList(OFFERS_LIST); setAnyForm(true) }} className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} > Список заказов </InvertBtn>
                  </div>
                </div>
              )}
              <div className='w-full'>
                {deviceForm && <AddDevice cancelFn={cancelAdd} className={deviceForm ? styles.modal_wrapper : classNames(styles.modal_wrapper, styles.modal_wrapper__disabled)} />}
                {brandForm && <AddBrand cancelFn={cancelAdd} className={brandForm ? styles.modal_wrapper : classNames(styles.modal_wrapper, styles.modal_wrapper__disabled)} />}
                {typeForm && <AddType cancelFn={cancelAdd} className={typeForm ? styles.modal_wrapper : classNames(styles.modal_wrapper, styles.modal_wrapper__disabled)} />}
                {colorForm && <AddColor cancelFn={cancelAdd} className={colorForm ? styles.modal_wrapper : classNames(styles.modal_wrapper, styles.modal_wrapper__disabled)} />}
                {someList && <SomeList cancelFn={cancelAdd} listSubject={someList} />}
                {offerList}

              </div>
            </div>
          </div>
        </>
      )
    }
  }

})


