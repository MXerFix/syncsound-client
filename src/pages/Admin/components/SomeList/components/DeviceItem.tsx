import React, { useEffect, useState } from 'react'
import styles from './deviceslist.css'
import classNames from 'classnames'
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Label from '@radix-ui/react-label';
import { Table } from '@radix-ui/themes';
import { deleteDevice, editDevice } from '../../../../../http/deviceAPI';
import Preloader from '../../../../../components/Preloader/Preloader';
import DeviceStore from '../../../../../store/DeviceStore';
import ErrorStore from '../../../../../store/ErrorStore';
import { ERROR_ALERT, GREEN_ALERT } from '../../../../../components/ErrorModal/ErrorModal';
import { observer } from 'mobx-react-lite';
import DeviceAddition from './DeviceAddition';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export const DeviceItem = observer(({ device, setFetchedList }: { device: any, setFetchedList: Function }) => {

  const [id, setId] = useState(device.id)
  const [nameInput, setNameInput] = useState<string>(device.name)
  const [descriptionInput, setDescriptionInput] = useState<string>(device.description)
  const [priceInput, setPriceInput] = useState<string>(device.price)
  const [oldPriceInput, setOldPriceInput] = useState<string>(device.oldPrice)
  const [bigDescriptionInput, setBigDescriptionInput] = useState<string>(device.paged_device[0].bigDescription ?? "")
  const [deviceAdditions, setDeviceAdditions] = useState<any>(JSON.parse(device.paged_device[0].device_additions) ?? "")
  const [deviceCount, setDeviceCount] = useState<number>(device.count)

  const [isAdditionsOpened, setIsAdditionsOpened] = useState(false)
  console.log(deviceAdditions)

  const [pending, setPending] = useState(false)

  // console.log(device)


  const resetChanges = () => {
    setNameInput(device.name)
    setDescriptionInput(device.description)
    setPriceInput(device.price)
    setOldPriceInput(device.oldPrice)
    setBigDescriptionInput(device.paged_device[0].bigDescription)
    setDeviceAdditions(JSON.parse(device.paged_device[0].device_additions))
    setDeviceCount(device.count)
  }

  const applyChanges = async () => {
    setPending(true)
    try {
      await editDevice({
        id: device.id,
        name: nameInput,
        description: descriptionInput,
        price: priceInput,
        oldPrice: oldPriceInput,
        count: deviceCount,
        bigDescription: bigDescriptionInput,
        deviceAdditions: JSON.stringify(deviceAdditions)
      }).then(data => {
        DeviceStore.setDevices(data.devices)
        ErrorStore.setError(GREEN_ALERT, "Изменения успешно сохранены")
      })
    } catch (error) {
      console.log(error)
      ErrorStore.setError(ERROR_ALERT, "Ошибка при сохранении изменений")
    } finally {
      setPending(false)
    }
  }


  const clickDelete = async () => {
    setPending(true)
    try {
      await deleteDevice({ id: id })
        .then(data => {
          DeviceStore.setDevices(data.devices);
          setFetchedList(data.devices.filter(({ id }: any) => id !== device.id))
        })
      ErrorStore.setError(GREEN_ALERT, "Товар успешно удалён")
    } catch (error) {
      console.log(error)
    } finally {
      setPending(false)
    }
  }

  // if (pending) {
  //   return (
  //     <Preloader />
  //   )
  // }


  return (
    <>
      {pending && <Preloader />}
      <AlertDialog.Root key={device.id}>
        <div className={styles.admin_device_card + ' mb-4'}>
          <div className='flex flex-row items-start justify-between'>
            <div className='flex flex-col items-start justify-start gap-2 mb-4 w-1/2 '>
              {/* <Table.Root>
          <Table.Body className=''>
            <Table.Row className='p-2'>
              <Table.Cell className='p-2 bg-white text-333 rounded-lg text-center'>
                ID
              </Table.Cell>
              <Table.Cell>
                {device.id}
              </Table.Cell>
            </Table.Row>
            <Table.Row className='p-2'>
              <Table.Cell className='p-2 bg-white text-333 rounded-lg text-center'>
                Название
              </Table.Cell>
              <Table.Cell>
                {device.name}
              </Table.Cell>
            </Table.Row>
            <Table.Row className='p-2'>
              <Table.Cell className='p-2 bg-white text-333 rounded-lg text-center'>
                Описание
              </Table.Cell>
              <Table.Cell>
                {device.description}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root> */}
              <div className='flex flex-row items-center justify-center gap-2'>
                <span className=' bg-white text-333 p-2 rounded-lg '> ID </span>
                <p className='text-white'> {device.id} </p>
              </div>
              <div className='flex flex-row items-center justify-center gap-2 w-full'>
                <span className=' bg-white text-333 p-2 rounded-lg '> Название </span>
                <input
                  className=' bg-333 rounded-lg border-2 border-[#222] text-white p-2 w-full'
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)} />
              </div>
              <div className='flex flex-row items-center justify-center gap-2 w-full'>
                <span className=' bg-white text-333 p-2 rounded-lg '> Описание </span>
                <input
                  type='text'
                  className=' bg-333 rounded-lg border-2 border-[#222] text-white p-2 w-full'
                  value={descriptionInput}
                  onChange={e => setDescriptionInput(e.target.value)} />
              </div>
              <div className='flex flex-row items-center justify-center gap-2 w-full'>
                <span className=' bg-white text-333 p-2 rounded-lg '> Цена </span>
                <input
                  className=' bg-333 rounded-lg border-2 border-[#222] text-white p-2 w-full'
                  type="text"
                  value={priceInput}
                  onChange={e => setPriceInput(e.target.value)} />
              </div>
              <div className='flex flex-row items-center justify-center gap-2 w-full'>
                <span className=' bg-white text-333 p-2 rounded-lg w-max block whitespace-nowrap '> Без скидки </span>
                <input
                  className=' bg-333 rounded-lg border-2 border-[#222] text-white p-2 w-full'
                  type="text"
                  value={oldPriceInput}
                  onChange={e => setOldPriceInput(e.target.value)} />
              </div>
              <div className='flex flex-row items-center justify-center gap-2 w-full'>
                <span className={` ${deviceCount ? 'bg-green-400' : 'bg-red-500'} text-333 p-2 rounded-lg w-max block whitespace-nowrap `}> {deviceCount ? 'В наличии' : 'Нет в наличии'} </span>
                <input
                  className=' bg-333 rounded-lg border-2 border-[#222] text-white p-2 w-full'
                  type="number"
                  value={deviceCount}
                  onChange={e => setDeviceCount(Number(e.target.value))} />
              </div>
              <button onClick={() => setIsAdditionsOpened(!isAdditionsOpened)} className='bg-white text-333 p-2 rounded-lg flex flex-row items-center justify-center gap-1 w-32'> {isAdditionsOpened ? "Свернуть" : "Развернуть"} <ChevronDownIcon className={` ${!isAdditionsOpened && 'rotate-180'} transition duration-200 `} /> </button>
              {isAdditionsOpened && (
                <>
                  <div className='flex flex-row items-center justify-center gap-2 w-full'>
                    <span className=' bg-white text-333 p-2 rounded-lg '> Большое описание </span>
                    <textarea
                      rows={6}
                      className=' bg-333 rounded-lg border-2 border-[#222] text-white p-2 w-full'
                      value={bigDescriptionInput}
                      onChange={e => setBigDescriptionInput(e.target.value)} />
                  </div>
                  <div>
                    {deviceAdditions.map((addition: any, idx: number) => (
                      <div className='my-1.5'>
                        <DeviceAddition setAdditions={setDeviceAdditions} additions={deviceAdditions} addition={addition} idx={idx} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div>
              <img className='max-h-[280px]' src={process.env.NODE_ENV === 'development' ? `http://localhost:3010/${device.img}` : `${process.env.REACT_APP_API_URL}/${device.img}`} alt="" />
              {/* <input className='bg-white text-333 rounded-lg' type="file" id='' /> */}
            </div>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <AlertDialog.Trigger onClick={e => { }} className="text-white hover:bg-red-600 transition shadow-blackA4 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-red-500 px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
              {/* <button onClick={e => console.log(e)} className="text-white hover:bg-red-600 transition shadow-blackA4 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-red-500 px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"> */}
              Удалить устройство
              {/* </button> */}
            </AlertDialog.Trigger>
            <div className=' flex flex-row justify-center items-center gap-2 '>
              <button onClick={resetChanges} className="text-333 hover:bg-neutral-200 transition shadow-blackA4 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
                Сбросить изменения
              </button>
              <button onClick={applyChanges} className="text-white hover:bg-green-500 transition shadow-blackA4 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green-400 px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
                Сохранить изменения
              </button>
            </div>
          </div>
          <AlertDialog.Portal >
            <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Вы уверенны?
              </AlertDialog.Title>
              <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                Это действие необратимо. После удаления устройства из базы данных, отменить действие будет невозможно!
              </AlertDialog.Description>
              <div className="flex justify-end gap-[25px]">
                <AlertDialog.Cancel asChild>
                  <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                    Отмена
                  </button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <button onClick={clickDelete} className="text-white bg-red-500 hover:bg-red-600 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                    Да, удалить
                  </button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </div>
      </AlertDialog.Root>
    </>
  )
}
)