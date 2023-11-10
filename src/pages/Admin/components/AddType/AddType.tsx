import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import Preloader from '../../../../components/Preloader/Preloader'
import { createType, fetchTypes } from '../../../../http/typesAPI'
import InvertBtn from '../../../../UI/InvertBtn/InvertBtn'
import styles from '../../admin.css'
import { AddDeviceI } from '../AddDevice/AddDevice'
import ErrorStore from '../../../../store/ErrorStore'
import { GREEN_ALERT } from '../../../../components/ErrorModal/ErrorModal'
import { fetchBrands } from '../../../../http/brandsAPI'
import BrandsStore from '../../../../store/BrandsStore'
import TypesStore from '../../../../store/TypesStore'

export const AddType = observer(({ className, cancelFn, ...props }: AddDeviceI) => {

  const [type, setType] = useState({name: ''})

  const [isLoading, setIsLoading] = useState(false)

  const addType = async (obj:object) => {
    setIsLoading(true)
    try {
      await createType(obj)
      ErrorStore.setError(GREEN_ALERT, "Наименование успешно добавлено!")
      await fetchTypes().then(data => TypesStore.setTypes(data))
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
        <div className='mb-4'>
          <label htmlFor="">Категория</label>
          <input className='px-4 py-1 ml-2 rounded-xl' type="text" onChange={(e) => setType({name: e.target.value})} />
        </div>
        <div className={styles.buttons_box}>
          <InvertBtn onClick={cancelFn} > Отмена </InvertBtn>
          <InvertBtn onClick={() => addType(type)} > Добавить </InvertBtn>
        </div>
      </form>
    </div>
  )
})
