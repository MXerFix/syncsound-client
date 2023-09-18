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

export const BRAND_LIST = 'brand_list'
export const DEVICE_LIST = 'device_list'
export const TYPE_LIST = 'type_list'



export const Admin = observer(() => {

  useEffect(() => {
    fetchTypes().then(data => TypesStore.setTypes(data))
  }, [])

  useEffect(() => {
    fetchBrands().then(data => BrandsStore.setBrands(data))
  }, [])

  useEffect(() => {
    fetchDevices().then(data => DeviceStore.setDevices(data))
  }, [])

  console.log(toJS(TypesStore.types))
  console.log(toJS(BrandsStore.brands))
  console.log(toJS(DeviceStore.devices))


  const IS_ADMIN = UserStore._user.role === 'ADMIN'


  const [anyForm, setAnyForm] = useState(false)
  const [deviceForm, setDeviceForm] = useState(false)
  const [brandForm, setBrandForm] = useState(false)
  const [typeForm, setTypeForm] = useState(false)
  const [someList, setSomeList] = useState('')
  const [list, setList] = useState(false)

  const cancelAdd = (e: any) => {
    e.preventDefault()
    setList(false)
    setBrandForm(false)
    setDeviceForm(false)
    setTypeForm(false)
    setSomeList('')
    setAnyForm(false)
  }


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
  } else {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div className='content'>
          <div className={anyForm ? classNames(styles.content_box, styles.content_box_disabled) : styles.content_box} >
            <div className={styles.menu_button__box}>
              <InvertBtn className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} onClick={() => { setDeviceForm(true); setAnyForm(true) }} > Добавить устройство </InvertBtn>
              <InvertBtn className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} onClick={() => { setBrandForm(true); setAnyForm(true) }} > Добавить бренд </InvertBtn>
              <InvertBtn className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} onClick={() => { setTypeForm(true); setAnyForm(true) }} > Добавить категорию </InvertBtn>
            </div>
            <div className={styles.menu_button__box}>
              <InvertBtn onClick={() => { setSomeList(DEVICE_LIST); setAnyForm(true) }} className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} > Список устройств </InvertBtn>
              <InvertBtn onClick={() => { setSomeList(BRAND_LIST); setAnyForm(true) }} className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} > Список брендов </InvertBtn>
              <InvertBtn onClick={() => { setSomeList(TYPE_LIST); setAnyForm(true) }} className={anyForm ? classNames(styles.add_btn, styles.device_add__form_disabled) : styles.add_btn} > Список категорий </InvertBtn>
            </div>
          </div>
          <div className='w-full'>
            <AddDevice cancelFn={cancelAdd} className={deviceForm ? styles.modal_wrapper : classNames(styles.modal_wrapper, styles.modal_wrapper__disabled)} />
            <AddBrand cancelFn={cancelAdd} className={brandForm ? styles.modal_wrapper : classNames(styles.modal_wrapper, styles.modal_wrapper__disabled)} />
            <AddType cancelFn={cancelAdd} className={typeForm ? styles.modal_wrapper : classNames(styles.modal_wrapper, styles.modal_wrapper__disabled)} />
            <SomeList cancelFn={cancelAdd} listSubject={someList} className={someList ? styles.modal_wrapper : classNames(styles.modal_wrapper, styles.modal_wrapper__disabled)} />
          </div>
        </div>
      </div>
    )
  }

})


