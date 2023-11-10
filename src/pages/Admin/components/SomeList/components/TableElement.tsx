import React, { useState } from 'react'
import { StatusDropdown } from '../SomeList'
import { IN_DELIVERY, PAYED, PROCESSING } from '../../../../../offerStatus'
import { CheckIcon, Cross1Icon, Cross2Icon } from '@radix-ui/react-icons'
import { send_track_number } from '../../../../../http/emailAPI'
import ErrorStore from '../../../../../store/ErrorStore'
import { ERROR_ALERT, GREEN_ALERT } from '../../../../../components/ErrorModal/ErrorModal'
import { change_offer_status, get_all_offers } from '../../../../../http/offerAPI'
import OffersStore from '../../../../../store/OffersStore'
import Preloader from '../../../../../components/Preloader/Preloader'

export const TableElement = ({ item, offerStatus, setStatusList, statusList }: { item: any, offerStatus: Function, setStatusList: Function, statusList: number }) => {

  const [trackInput, setTrackInput] = useState(false)
  const [trackNumber, setTrackNumber] = useState<string>('')
  const [pending, setPending] = useState(false)

  const checkCanTrackBeSended = (status: string) => {
    if (status === PROCESSING || status === PAYED) {
      return false
    }
    else return true
  }

  const sendTrack = async () => {
    setPending(true)
    const send = async () => {
      await send_track_number({ to: [item.userEmail], subject: `Информация по Вашему заказу на syncsound.ru` }, { delivery_price: item.delivery_price, name: item.userName, offer_id: item.id, payment: item.payment, sum: item.sum, track_number: trackNumber })
    }
    try {
      send()
      setTrackInput(false);
      await change_offer_status({ id: item.id, status: IN_DELIVERY })
      await get_all_offers().then(data => OffersStore.setOffers(data))
      item.status = IN_DELIVERY
      ErrorStore.setError(GREEN_ALERT, "Трек успешно отправлен!");
    } catch (error) {
      ErrorStore.setError(ERROR_ALERT, error)
    } finally {
      setTimeout(() => {
        setPending(false)
      }, 500);
    }
  }

  if (pending) {
    return (
      <Preloader />
    )
  }

  // const [trackInput, setTrackInput] = useState(false)

  return (
    <div key={item.id} className='flex flex-row items-center justify-center gap-2 text-white'>
      <p className=' w-8 flex items-center justify-center py-1 px-2 bg-[#202020] ' >{item.id}</p>
      <p className=' w-32 py-1 px-2 bg-[#202020] '>{item.userTel}</p>
      <p className=' w-60 py-1 px-2 bg-[#202020] '>{item.userEmail}</p>
      <p className=' w-40 py-1 px-2 bg-[#202020] '>{item.payment}</p>
      <StatusDropdown item={item} offerStatus={offerStatus} setStatusList={setStatusList} statusList={statusList} key={item.id} />
      <p className=' w-24 py-1 px-2 bg-[#202020] '>{item.sum}</p>
      <p className=' w-24 py-1 px-2 bg-[#202020] '>{item.delivery_price}</p>
      <p className=' w-24 py-1 px-2 bg-[#202020] '>{item.delivery_price + item.sum}</p>
      {trackInput ?
        <div className='w-[280px] flex flex-row items-center justify-center gap-2 '>
          <input value={trackNumber} onChange={e => setTrackNumber(e.target.value)} type="text" className='text-black w-full ' />
          <button onClick={e => sendTrack()} > <CheckIcon className='bg-333 h-6 w-6 transition duration-150 hover:bg-white hover:text-333' /> </button>
          <button onClick={e => setTrackInput(false)}> <Cross2Icon className='bg-333 h-6 w-6 transition duration-150 hover:bg-white hover:text-333' /> </button>
        </div>
        :
        <>
          <button
            onClick={e => setTrackInput(true)}
            disabled={checkCanTrackBeSended(item.status)}
            className={`w-max py-1 px-2 bg-[#202020] ${checkCanTrackBeSended(item.status) ? 'bg-transparent text-transparent' : 'hover:bg-white hover:text-333 transition duration-300'} `} >
            Отправить письмо с трек-номером
          </button>
        </>
      }
    </div>
  )
}
