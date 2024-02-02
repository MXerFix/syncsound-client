import { toJS } from 'mobx'
import React, { useEffect, useState } from 'react'
import { deleteDevice, fetchDevices } from '../../../../../http/deviceAPI'
import DeviceStore from '../../../../../store/DeviceStore'
import InvertBtn from '../../../../../UI/InvertBtn/InvertBtn'
import { AddDeviceI } from '../../AddDevice/AddDevice'
import styles from './deviceslist.css'
import classNames from 'classnames'
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Label from '@radix-ui/react-label';
import { DeviceItem } from './DeviceItem'
import { GREEN_ALERT } from '../../../../../components/ErrorModal/ErrorModal'
import ErrorStore from '../../../../../store/ErrorStore'
import { observer } from 'mobx-react-lite'

export const DevicesList = observer(({ cancelFn }: AddDeviceI) => {


  const [fetchedList, setFetchedList] = useState(toJS(DeviceStore.devices))
  const [fetchedListJSX, setFetchedListJSX] = useState(fetchedList.map((device) =>
    <DeviceItem setFetchedList={setFetchedList} key={device.id} device={device} />
  ))

  // console.log(toJS(DeviceStore.devices))

  // useEffect(() => {
  //   setFetchedList(prev => DeviceStore.devices)
  //   setFetchedListJSX(prev => fetchedList.map((device) =>
  //     <DeviceItem setFetchedList={setFetchedList} key={device.id} device={device} />
  //   ))
  //   // console.log(fetchedList)
  // }, [DeviceStore.devices])
  // const clickDelete = async (id: object) => {
  //   const response = await deleteDevice({ id: id }).then(data => DeviceStore.setDevices(data))
  //   return response
  // }



  // useEffect(() => {
  //   const fetch = async () => {
  //     await fetchDevices().then(data => { DeviceStore.setDevices(data); setFetchedList(data) })
  //   }
  //   fetch()
  //   setFetchedListJSX(fetchedList.map((device) =>
  //   <DeviceItem deleteFn={clickDelete} key={device.id} device={device} />
  //   ))
  //   console.log(fetchedList)
  // }, [clickDelete])




  return (
    <div className='w-full'>
      <div className={styles.wrapper + 'relative'}>
        <div className={styles.in_wrapper + ' mt-12 h-max'}>
          {fetchedListJSX}
        </div>
        <InvertBtn className='fixed z-10 bottom-4 left-4' onClick={cancelFn}> Назад </InvertBtn>
      </div>
    </div>
  )
})
