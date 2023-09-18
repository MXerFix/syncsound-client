import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import BrandsStore from '../../../../store/BrandsStore'
import DeviceStore from '../../../../store/DeviceStore'
import TypesStore from '../../../../store/TypesStore'
import InvertBtn from '../../../../UI/InvertBtn/InvertBtn'
import { BRAND_LIST, DEVICE_LIST, TYPE_LIST } from '../../Admin'
import { AddDeviceI } from '../AddDevice/AddDevice'
import { DevicesList } from './components/DevicesList'

export const SomeList = observer(({ className, cancelFn, listSubject, ...props }: AddDeviceI) => {

  const whatListFetching = (listSubject: string) => {
    const arr: any = []
    switch (listSubject) {
      case BRAND_LIST: return toJS(BrandsStore.brands); break;
      case DEVICE_LIST: return toJS(DeviceStore.devices); break;
      case TYPE_LIST: return toJS(TypesStore.types); break;
      case '': return arr; break
    }
  }

  const fetchedList = whatListFetching(listSubject).map((item: any) =>
    <div>
      {item.name}
    </div>
  )

  if (listSubject === DEVICE_LIST) {
    return (
      <div className=' overflow-scroll w-full'>
        <DevicesList cancelFn={cancelFn} />
      </div>
    )
  }

  else {
    return (
      <div className={className}>
        <div>
          {fetchedList}
        </div>
        <InvertBtn onClick={cancelFn} > Назад </InvertBtn>
      </div>
    )
  }

})
