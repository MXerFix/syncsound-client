import React, { useState } from 'react'
import { BRAND_LIST, COLOR_LIST, TYPE_LIST } from '../../../Admin'
import { editColor } from '../../../../../http/colorsApi'
import { editBrand } from '../../../../../http/brandsAPI'
import { editType } from '../../../../../http/typesAPI'
import ErrorStore from '../../../../../store/ErrorStore'
import { ERROR_ALERT, GREEN_ALERT } from '../../../../../components/ErrorModal/ErrorModal'
import { observer } from 'mobx-react-lite'

type SomeListType = {
  item: {
    id: string | number
    name: string
    value?: string
  }
  listSubject: string
}

export const SomeItem = observer(({ item, listSubject }: SomeListType) => {

  const [isEditName, setIsEditName] = useState(false)
  const [isEditValue, setIsEditValue] = useState(false)
  const [isSet, setIsSet] = useState(true)
  const [name, setName] = useState(item.name)
  const [value, setValue] = useState(item.value ?? '')

  const setEditHandler = async () => {
    try {
      if (listSubject === COLOR_LIST) {
        const response = editColor({ id: item.id, name: name, value: value })
        ErrorStore.setError(GREEN_ALERT, "Changes was successfully accepted")
        setIsEditName(false)
        setIsEditValue(false)
        setIsSet(false)
        return response
      } else if (listSubject === BRAND_LIST) {
        const response = editBrand({ id: item.id, name: name })
        ErrorStore.setError(GREEN_ALERT, "Changes was successfully accepted")
        setIsEditName(false)
        setIsEditValue(false)
        setIsSet(false)
        return response
      } else if (listSubject === TYPE_LIST) {
        const response = editType({ id: item.id, name: name })
        ErrorStore.setError(GREEN_ALERT, "Changes was successfully accepted")
        setIsEditName(false)
        setIsEditValue(false)
        setIsSet(false)
        return response
      }
    } catch (error) {
      console.log(error)
      ErrorStore.setError(ERROR_ALERT, error.message)
    }
  }

  return (
    <div key={item.name} className=' text-white '>
      <div className='flex flex-row items-center justify-center gap-2 text-white'>
        <p
          className='w-8 flex items-center justify-center font-bold text-18 py-1 px-2 bg-[#222] '
        >
          {item.id}
        </p>
        <p
          className=' flex flex-row justify-between w-48 font-bold text-18 py-1 px-2 bg-[#222] '
        >
          {isEditName ? <input className='text-black w-32' type="text" value={name} onChange={(e) => setName(e.target.value)} /> : name}
          {isEditName ? <button onClick={() => setIsEditName(false)} > cancel </button> : <button onClick={() => setIsEditName(true)} > edit </button>}
        </p>
        {item.value &&
          <p
            className=' flex flex-row justify-between w-48 font-bold text-18 py-1 px-2 bg-[#222] '
          >
            {isEditValue ? <input className='text-black w-32' type="text" value={value} onChange={(e) => setValue(e.target.value)} /> : value}
            {isEditValue ? <button onClick={() => setIsEditValue(false)} > cancel </button> : <button onClick={() => setIsEditValue(true)} > edit </button>}
          </p>
        }
        {isSet && (name !== item.name || (item.value ? value !== item.value : false)) && <button onClick={setEditHandler} >set</button>}
      </div>
    </div>
  )
})
