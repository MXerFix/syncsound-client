import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import Preloader from '../../../../components/Preloader/Preloader'
import { createType } from '../../../../http/typesAPI'
import InvertBtn from '../../../../UI/InvertBtn/InvertBtn'
import styles from '../../admin.css'
import { AddDeviceI } from '../AddDevice/AddDevice'

export const AddType = observer(({ className, cancelFn, ...props }: AddDeviceI) => {

  const [type, setType] = useState({name: ''})

  const [isLoading, setIsLoading] = useState(false)

  const addType = async (obj:object) => {
    setIsLoading(true)
    try {
      await createType(obj)
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
          <label htmlFor="">Категория</label>
          <input type="text" onChange={(e) => setType({name: e.target.value})} />
        </div>
        <div className={styles.buttons_box}>
          <InvertBtn onClick={cancelFn} > Отмена </InvertBtn>
          <InvertBtn onClick={() => addType(type)} > Добавить </InvertBtn>
        </div>
      </form>
    </div>
  )
})
