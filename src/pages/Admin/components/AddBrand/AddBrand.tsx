import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import Preloader from '../../../../components/Preloader/Preloader'
import { createBrand } from '../../../../http/brandsAPI'
import InvertBtn from '../../../../UI/InvertBtn/InvertBtn'
import styles from '../../admin.css'
import { AddDeviceI } from '../AddDevice/AddDevice'

export const AddBrand = observer(({ className, cancelFn, ...props }: AddDeviceI) => {

  const [brand, setBrand] = useState({name: ''})
  const [isLoading, setIsLoading] = useState(false)

  const addBrand = async (obj:object) => {
    setIsLoading(true)
    try {
      await createBrand(obj)
    } catch (error) {
      return error
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Preloader />


  return (
    <div className={className}>
      <form action="" className={styles.device_add__form} >
        <div>
          <label htmlFor="">Бренд</label>
          <input onChange={(e) => setBrand({name: e.target.value})} type="text" />
        </div>
        <div className={styles.buttons_box}>
          <InvertBtn onClick={cancelFn} > Отмена </InvertBtn>
          <InvertBtn onClick={() => addBrand(brand)} > Добавить </InvertBtn>
        </div>
      </form>
    </div>
  )
})
