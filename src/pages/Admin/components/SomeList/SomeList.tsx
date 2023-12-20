import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import BrandsStore from '../../../../store/BrandsStore'
import DeviceStore from '../../../../store/DeviceStore'
import TypesStore from '../../../../store/TypesStore'
import InvertBtn from '../../../../UI/InvertBtn/InvertBtn'
import { BRAND_LIST, COLOR_LIST, DEVICE_LIST, OFFERS_LIST, TYPE_LIST } from '../../Admin'
import { AddDeviceI } from '../AddDevice/AddDevice'
import { DevicesList } from './components/DevicesList'
import { change_offer_status, get_all_offers } from '../../../../http/offerAPI'
import OffersStore from '../../../../store/OffersStore'
import { CREATED, FINISHED, IN_DELIVERY, OFFER_ERROR, OFFER_STATUSES, PAYED, PROCESSING, VALIDATING } from '../../../../offerStatus'
import useOutsideClick from '../../../../hooks/useOutsideClick'
import Preloader from '../../../../components/Preloader/Preloader'
import { TableElement } from './components/TableElement'
import { Cross1Icon, TrashIcon } from '@radix-ui/react-icons'
import ColorsStore from '../../../../store/ColorsStore'
import { SomeItem } from './components/SomeItem'

export const SomeList = observer(({ className, cancelFn, listSubject, ...props }: AddDeviceI) => {

  const [fetchedListState, setFetchedListState] = useState<any[]>([])
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [statusList, setStatusList] = useState<number>(-1)

  const ref = useRef<any>(null)




  // const whatListFetching = (listSubject: string) => {
  //   const arr: any = []
  //   switch (listSubject) {
  //     case BRAND_LIST: return toJS(BrandsStore.brands); break;
  //     case DEVICE_LIST: return toJS(DeviceStore.devices); break;
  //     case TYPE_LIST: return toJS(TypesStore.types); break;
  //     case OFFERS_LIST: return getOffers() ; break;
  //     case '': return arr; break
  //   }
  // }

  useEffect(() => {
    const whatListFetching = (listSubject: string) => {
      const arr: any = []
      switch (listSubject) {
        case BRAND_LIST: return toJS(BrandsStore.brands); break;
        case DEVICE_LIST: return toJS(DeviceStore.devices); break;
        case TYPE_LIST: return toJS(TypesStore.types); break;
        case OFFERS_LIST: return toJS(OffersStore.offers); break;
        case COLOR_LIST: return toJS(ColorsStore.colors); break;
        case '': return arr; break
      }
    }

    setFetchedListState(whatListFetching(listSubject))

  }, [])


  useEffect(() => {
    if (fetchedListState.length) {
      setIsFetched(true)
    }
  }, [fetchedListState])

  const offerStatus = (status: string) => {
    switch (status) {
      case CREATED: return 'bg-yellow-300 text-black px-2 rounded  w-24 flex'
      case VALIDATING: return 'bg-yellow-500 text-black px-2 rounded  w-24 flex'
      case PROCESSING: return 'bg-orange-300 text-black px-2 rounded  w-24 flex'
      case PAYED: return 'bg-green-200 text-black px-2 rounded  w-24 flex'
      case IN_DELIVERY: return 'bg-green-300 text-black px-2 rounded  w-24 flex'
      case FINISHED: return 'bg-green-400 text-black px-2 rounded  w-24 flex'
      case OFFER_ERROR: return 'bg-red-400 text-black px-2 rounded  w-24 flex'
        return ''
    }
  }

  const changeStatus = (status: string) => {

  }

  if (isFetched) {
    const fetchedList = fetchedListState.map((item: any) => <SomeItem listSubject={listSubject} item={item} /> )

    if (listSubject === DEVICE_LIST) {
      return (
        <div className=' w-full'>
          <DevicesList cancelFn={cancelFn} />
        </div>
      )
    } else if (listSubject === OFFERS_LIST) {
      return (
        <div className=' w-full flex flex-col items-center justify-center gap-4 mt-8'>
          <div className='flex flex-row items-center justify-center gap-2 text-white'>
            <p className=' w-8 flex items-center justify-center font-bold text-18 py-1 px-2 bg-[#181818] '>ID</p>
            <p className=' w-32 font-bold text-18 py-1 px-2 bg-[#181818] '>Телефон</p>
            <p className=' w-60 font-bold text-18 py-1 px-2 bg-[#181818] '>Email</p>
            <p className=' w-40 font-bold text-18 py-1 px-2 bg-[#181818] '>Способ оплаты</p>
            <p className=' w-28 font-bold text-18 py-1 px-2 bg-[#181818] '>Статус</p>
            <p className=' w-24 font-bold text-18 py-1 px-2 bg-[#181818] '>Сумма</p>
            <p className=' w-24 font-bold text-18 py-1 px-2 bg-[#181818] '>Доставка</p>
            <p className=' w-24 font-bold text-18 py-1 px-2 bg-[#181818] '>Итог</p>
            <button disabled className='w-[280px] text-18 py-1 px-2 bg-[#181818] text-white' > Трек-номер пользователю </button>
          </div>
          {fetchedListState?.map((item: any) => (
            <TableElement item={item} statusList={statusList} offerStatus={offerStatus} setStatusList={setStatusList} key={item.id} />
          ))}
          <div className='flex flex-row items-center justify-center gap-4'>
            <InvertBtn onClick={cancelFn} > Назад </InvertBtn>
            {/* <InvertBtn> Сохранить </InvertBtn> */}
          </div>
        </div>
      )
    }

    else {
      return (
        <div className={className + ' ' + 'flex flex-col items-center justify-center min-h-[75vh]'}>
          <div className=' flex flex-col items-center justify-center gap-2 mb-12 '>
            <div className='flex flex-row items-center justify-center gap-2 text-white'>
              <p className=' w-8 flex items-center justify-center font-bold text-18 py-1 px-2 bg-[#181818] '>ID</p>
              <p className=' w-48 font-bold text-18 py-1 px-2 bg-[#181818] '>Наименование</p>
              {fetchedListState[0].value && <p className=' w-48 font-bold text-18 py-1 px-2 bg-[#181818] '>Значение</p>}
            </div>
            {fetchedList}
          </div>
          <InvertBtn onClick={cancelFn} > Назад </InvertBtn>
        </div>
      )
    }
  }

})

export const StatusDropdown = ({ setStatusList, statusList, offerStatus, item }: { setStatusList: Function, statusList: number, offerStatus: Function, item: any }) => {

  const [status, setStatus] = useState('')
  const [pending, setPending] = useState(false)
  const { ref, isActive, setIsActive } = useOutsideClick(false)

  const changeStatus = async (offer_status: string) => {
    setPending(true)
    setStatus(offer_status)
    item.status = offer_status
    await change_offer_status({ id: item.id, status: offer_status, trackNum: 'not in delivery' })
    await get_all_offers().then(data => OffersStore.setOffers(data)).then(() => {
      setTimeout(() => {
        setPending(false)
        setStatusList(-1)
      }, 500);
    })
  }

  // const ref = useRef<any>(null)

  // const outsideClickHandler = (e: any) => {
  //   console.log(statusList)
  //   if (ref.current && (statusList !== -1)) {
  //     if (!ref.current.contains(e.target)) {
  //       console.log(statusList)
  //       setStatusList(-1)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('click', outsideClickHandler)
  // }, [])

  if (pending) {
    return (
      <Preloader />
    )
  }

  return (
    <div ref={ref} className=' w-28 py-1 px-2 bg-[#202020] relative '>
      <span onClick={e => { setIsActive(!isActive); setStatusList(item.id) }} className={`${offerStatus(item.status)} flex items-center justify-center cursor-pointer `} > {item.status} </span>
      {isActive && (statusList === item.id) && (
        <div className=' absolute flex flex-col items-center justify-center z-10 bg-[#222] rounded gap-2 py-2 px-2 left-0 ' >
          {OFFER_STATUSES.filter((offer_status) => offer_status !== item.status).map((offer_status) => (
            <span key={offer_status} onClick={e => changeStatus(offer_status)} className={` ${offerStatus(offer_status)} flex items-center justify-center cursor-pointer `} >
              {offer_status}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}