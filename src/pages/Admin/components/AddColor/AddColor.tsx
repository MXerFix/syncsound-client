import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import Preloader from '../../../../components/Preloader/Preloader'
import { createType } from '../../../../http/typesAPI'
import InvertBtn from '../../../../UI/InvertBtn/InvertBtn'
import styles from '../../admin.css'
import { AddDeviceI } from '../AddDevice/AddDevice'
import { createColor } from '../../../../http/colorsApi'

export const AddColor = observer(({ className, cancelFn, ...props }: AddDeviceI) => {

  const [color, setColor] = useState({ name: '', value: '' })

  const [isLoading, setIsLoading] = useState(false)

  const addColor = async (obj: object) => {
    setIsLoading(true)
    try {
      await createColor(obj)
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
          <div>
            <label htmlFor="">Имя</label>
            <input className='px-4 py-1 ml-2 rounded-xl' type="text" onChange={(e) => setColor({ name: e.target.value, value: color.value })} />
          </div>
          <div>
            <label htmlFor="">Цвет</label>
            <input className='px-4 py-1 ml-2 rounded-xl' type="text" onChange={(e) => setColor({ name: color.name, value: e.target.value })} />
          </div>
        </div>
        <div className={styles.buttons_box}>
          <InvertBtn onClick={cancelFn} > Отмена </InvertBtn>
          <InvertBtn onClick={() => addColor(color)} > Добавить </InvertBtn>
        </div>
      </form>
    </div>
  )
})
