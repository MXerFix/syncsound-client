import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import Preloader from '../../../../components/Preloader/Preloader'
import { createBrand, fetchBrands } from '../../../../http/brandsAPI'
import InvertBtn from '../../../../UI/InvertBtn/InvertBtn'
import styles from '../../admin.css'
import { AddDeviceI } from '../AddDevice/AddDevice'
import ErrorStore from '../../../../store/ErrorStore'
import { GREEN_ALERT } from '../../../../components/ErrorModal/ErrorModal'
import BrandsStore from '../../../../store/BrandsStore'

export const AddBrand = observer(({ className, cancelFn, ...props }: AddDeviceI) => {

  const [brand, setBrand] = useState({name: ''})
  const [isLoading, setIsLoading] = useState(false)

  const addBrand = async (obj:object) => {
    setIsLoading(true)
    try {
      await createBrand(obj)
      ErrorStore.setError(GREEN_ALERT, "Наименование успешно добавлено!")
      await fetchBrands().then(data => BrandsStore.setBrands(data))
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Preloader />


  return (
    <div className={className}>
      <form action="" className={styles.device_add__form} >
        <div className='mb-4'>
          <label htmlFor="">Бренд</label>
          <input className='px-4 py-1 ml-2 rounded-xl' onChange={(e) => setBrand({name: e.target.value})} type="text" />
        </div>
        <div className={styles.buttons_box}>
          <InvertBtn onClick={cancelFn} > Отмена </InvertBtn>
          <InvertBtn onClick={() => addBrand(brand)} > Добавить </InvertBtn>
        </div>
      </form>
    </div>
  )
})
