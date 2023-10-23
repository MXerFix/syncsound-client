import React, { useDeferredValue, useEffect, useId, useState } from 'react';
import { YooCheckout, ICreatePayment } from '@a2seven/yoo-checkout';
import { Header } from '../../components/Header';
import styles from './basket.css';
import UserStore from '../../store/UserStore';
import BasketStore from '../../store/BasketStore';
import BasketProdCard from '../../components/BasketProdCard/BasketProdCard';
import { observer } from 'mobx-react-lite';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import { toJS } from 'mobx';
import DeviceStore from '../../store/DeviceStore';
import InvertBtn from '../../UI/InvertBtn/InvertBtn';
import { createOfferDeviceFn, createOfferFn } from '../../http/offerAPI';
import TypesStore from '../../store/TypesStore';
import BrandsStore from '../../store/BrandsStore';
import { fetchTypes } from '../../http/typesAPI';
import { fetchBrands } from '../../http/brandsAPI';
import { fetchDevices } from '../../http/deviceAPI';
import PreloaderMini from '../../components/PreloaderMini/PreloaderMini';
import { BasketList } from './components/BasketList/BasketList';
import ErrorStore from '../../store/ErrorStore';
import { ERROR_ALERT, GREEN_ALERT, WARNING_ALERT } from '../../components/ErrorModal/ErrorModal';
import Preloader from '../../components/Preloader/Preloader';
import { validatePhone } from '../../helpers/validatePhohe';
import randomize from 'randomatic'
import { isMobile } from '../../App';
import { MobileFooter } from '../../components/Mobile/Footer';
import { Footer } from '../../components/Footer/Footer';
import conditions from '../../public/shared/terms_and_conditions.pdf'
import policy from '../../public/shared/policy_personal.pdf'
import { emailDeviceType, send_confirmation, send_offer_to_me, send_offer_to_user } from '../../http/emailAPI';
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes'
import { Combobox } from '@headlessui/react'
import { $host } from '../../http';
import classNames from 'classnames';
import * as Switch from '@radix-ui/react-switch';
import { create_yookassa_payment, get_boxberry_cities, get_boxberry_points, get_boxberry_price, get_boxberry_price_courier } from '../../http/outsideApi';
import { validateName } from '../../helpers/validateName';



export const PAYMENT__WHEN_GET = 'when_get'
export const PAYMENT__CARD = 'card'
export const PAYMENT__SBP = 'sbp'


export const Basket = observer(() => {


  const [deliveryPricePending, setDeliveryPricePending] = useState(false)
  const [deliveryPrice, setDeliveryPrice] = useState('')
  const [deliveryType, setDeliveryType] = useState(false)
  const [deliveryCities, setDeliveryCities] = useState<any[]>()
  const [deliveryPVZTemp, setDeliveryPVZTemp] = useState<any>()
  const [deliveryPVZ, setDeliveryPVZ] = useState<any[]>()
  const [confirmIncorrect, setConfirmIncorrect] = useState(false)
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false)
  const [emailConfirmationDialog, setEmailConfirmationDialog] = useState(false)
  const [confirmationPending, setConfirmationPending] = useState(false)
  const [checkConfirmationPending, setCheckConfirmationPending] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState('')
  const [currentConfCode, setCurrentConfCode] = useState('')
  const [offerPending, setOfferPending] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [payment, setPayment] = useState('')
  const [email, setEmail] = useState(UserStore.user.email ? UserStore.user.email : '')
  const [name, setName] = useState(UserStore.user.name ? UserStore.user.name : '')
  const [tel, setTel] = useState(UserStore.user.tel ? UserStore.user.tel : '')
  const [sum, setSum] = useState(0)
  const [town, setTown] = useState('')
  const [pvzAddress, setPvzAddress] = useState('')
  const [postIndex, setPostIndex] = useState('')
  const [street, setStreet] = useState('')
  const [house, setHouse] = useState('')
  const [apartment, setApartment] = useState('')

  const navigate = useNavigate()


  console.log()

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // const [emailDevices, setEmailDevices] = useState<emailDeviceType[]>([])

  // const sender = new Resend('re_G7rAFVpp_4VMo7c84s5MMAfKU95sPcFKu')
  // const [basketList, setBasketList] = useState(toJS(DeviceStore.devices).filter((obj) => { return BasketStore.BASKET_LIST.includes(obj.id) }))

  useEffect(() => {
    fetchTypes().then(data => TypesStore.setTypes(data))
    fetchBrands().then(data => BrandsStore.setBrands(data))
    fetchDevices().then(data => DeviceStore.setDevices(data))
    const fetchDeliveryInfo = async () => {
      try {
        const towns = await get_boxberry_cities()
        const pvzs = await get_boxberry_points()
        setDeliveryCities((prev: any) => towns?.data.map((city: any) => { return { name: city.Name, code: city.Code, countryCode: city.CountryCode } }))
        setDeliveryPVZ((prev: any) => pvzs?.data.map((pvz: any) => { return { address: pvz.Address, code: pvz.Code, city: pvz.CityName, cityCode: pvz.CityCode } }))
      } catch (error) {
        console.log(error)
      }
    }
    fetchDeliveryInfo()
  }, [])

  useEffect(() => {
    setPostIndex('')
    setPvzAddress('')
    setHouse('')
    setApartment('')
    setStreet('')
    setDeliveryPrice('')
  }, [deliveryType])

  const basketList = toJS(DeviceStore.devices).filter((obj) => { return BasketStore.BASKET_LIST.includes(obj.id) })


  const basketListJSX = basketList.map(({ id, name, description, price, oldPrice, img }) => {
    return (
      <div key={id} className={styles.basket__product_card}>
        <BasketProdCard setSum={setSum} id={id} name={name} price={price} description={description} oldPrice={oldPrice} img={img} />
      </div>
    )
  })

  let emailDevices: emailDeviceType[] = []
  let offer_id: number | null = null

  const deliveryPriceHandler = async (pvz_code: string, sum: string, pvz_address?: string,) => {
    setDeliveryPricePending(prev => true)
    if (!deliveryType) {
      try {
        setPvzAddress(pvz_address ?? "")
        const response = await get_boxberry_price({ target: pvz_code, sum: sum })
        console.log(response)
        setDeliveryPrice(response?.data.price)
      } catch (error) {
        console.log(error)
      } finally {
        setDeliveryPricePending(prev => false)
      }
    } else {
      try {
        const response = await get_boxberry_price_courier({ zip: pvz_code, sum: sum })
        console.log(response)
        setDeliveryPrice(response?.data.price)
      } catch (error) {
        console.log(error)
      } finally {
        setDeliveryPricePending(prev => false)
      }
    }
  }

  useEffect(() => {
    if (postIndex.length == 6 && deliveryType) {
      deliveryPriceHandler(postIndex, sum.toString())
    }
  }, [postIndex])

  useEffect(() => {
    setPvzAddress('')
  }, [town])



  // useEffect(() => {
  //   setBasketList(toJS(DeviceStore.devices).filter((obj) => { return BasketStore.BASKET_LIST.includes(obj.id) }))
  // }, [])

  // useEffect(() => {
  //   setBasketList(toJS(DeviceStore.devices).filter((obj) => { return BasketStore.BASKET_LIST.includes(obj.id) }))
  // }, [BasketStore.basketList])

  useEffect(() => { }, [emailDevices, offer_id])


  const sendEmailHandler = async (payment_type: string) => {
    // await sendEmail(offer_id, name, email, tel, town, postIndex, street, house, apartment, emailDevices, payment, sum)
    send_offer_to_me({ to: ['maksim2003003@gmail.com', 'syncsoundshop@gmail.com'], subject: "Новый заказ" }, { offer_id, name, email, tel, town, pvzAddress, postIndex, street, house, apartment, payment: payment_type, sum, devices: emailDevices })
    send_offer_to_user({ to: [email], subject: "Новый заказ в фирменном магазине SyncSound.ru" }, { devices: emailDevices, name: name, offer_id: offer_id ? offer_id.toString() : '', payment: payment, sum: sum, pvzAddress })
    emailDevices = []
    offer_id = 0
  }

  const emailConfirmationHandler = async () => {
    setConfirmationPending(prev => true)
    if (isValidEmail(email) && validateName(name) && validatePhone(tel) && basketList.length !== 0 && ((street && house) || pvzAddress) && payment) {
      setEmailConfirmationDialog(true)
      const confirmCode = randomize('0', 6)
      setCurrentConfCode(prev => confirmCode)
      send_confirmation({ to: [email], subject: 'Код подтверждения для заказа SyncSound.ru' }, { confirmation: confirmCode })
      setTimeout(() => {
        // setEmailConfirmationDialog(prev => true)
        setConfirmationPending(prev => false)
      }, 500);
    } 
    else if (!basketList.length) {
      ErrorStore.setError(WARNING_ALERT, "Кажется, Ваша корзина пустая...")
    } 
    else if (!validateName(name)) {
      ErrorStore.setError(WARNING_ALERT, "Некорректное ФИО!")
    } 
    else if (!isValidEmail(email)) {
      ErrorStore.setError(WARNING_ALERT, "Некорректный адрес электронной почты!")
    } 
    else if (!validatePhone(tel)) {
      ErrorStore.setError(WARNING_ALERT, "Некорректный номер телефона!")
    } 
    else if (!payment) {
      ErrorStore.setError(WARNING_ALERT, "Выберите способ оплаты!")
    }
    else {
      // console.log(isValidEmail(email), name.length > 1, validatePhone(tel), basketList.length !== 0, deliveryCities?.some((city: any) => city.Name == town), pvzAddress)
      ErrorStore.setError(WARNING_ALERT, "Некоррекные данные! Заполните все поля!")
    }
  }

  const emailConfirmationCheck = () => {
    setCheckConfirmationPending(prev => true)
    if (currentConfCode == confirmationCode && confirmationCode.length == 6) {
      setTimeout(() => {
        setIsEmailConfirmed(prev => true)
        // ErrorStore.setError(GREEN_ALERT, "Заказ успешно создан! Менеджер свяжется с Вами в ближайшее время!")
        // setEmailConfirmationInput(false)
        setCheckConfirmationPending(prev => false)
      }, 500);
      return true
    } else {
      setTimeout(() => {
        // ErrorStore.setError(WARNING_ALERT, "Некорректный код подтверждения!")
        setCheckConfirmationPending(prev => false)
      }, 200);
      return false
    }
  }



  // const sum = (basketList.length > 1 ? basketList.reduce((prev, curr) => {return prev.price += curr.price}) : (basketList.length === 1 ? basketList[0].price : 0));

  const addOffer = async (userEmail: string, userTel: string, userName: string, sum: number, payment: string) => {
    setOfferPending(prev => true)
    if (!isEmailConfirmed) {
      if (userEmail.length && userName.length >= 2 && validatePhone(userTel) && sum) {
        try {
          await createOfferFn({ userName: userName, userTel: userTel, userEmail: userEmail, sum: sum, payment: payment, address: JSON.stringify({ city: town, pvz: pvzAddress, street: street, house: house, apartment: apartment }) }).then(data => {
            offer_id = data.offer.id
            localStorage.setItem('offer_id', data.offer.id.toString())
            basketList.forEach(async (device, idx) => {
              await createOfferDeviceFn({ offerID: data.offer.id, deviceID: device.id }).then(data => {
                const device = toJS(DeviceStore.devices).find((device) => device.id == data.offer_device.deviceId)
                const new_device: emailDeviceType = {
                  name: device.name,
                  price: device.price,
                  id: device.id
                }
                console.log(new_device)
                emailDevices = [...emailDevices, new_device]
                if (idx + 1 == basketList.length) {
                  sendEmailHandler(`${payment}-orderID=${offer_id}`)
                }
              })
            })
          })
          ErrorStore.setError(GREEN_ALERT, "Заказ успешно создан! Менеджер свяжется с Вами в ближайшее время!")
          localStorage.removeItem('basket')
        } catch (error) {
          console.log(error);
        } finally {
          setOfferPending(prev => false)
        }
      } else {
        setOfferPending(prev => false)
        ErrorStore.setError(WARNING_ALERT, "Некорректно заполнены данные!")
      }
    } else {
      ErrorStore.setError(WARNING_ALERT, "Подтвердите email!")
      setOfferPending(prev => false)
    }
  }

  const shopID = process.env.REACT_APP_SHOP_ID ?? ""
  const secretKey = process.env.REACT_APP_PAYMENT_SECRET_KEY ?? ""

  const createYooKassaPayment = async () => {
    // const checkout = new YooCheckout({ shopId: shopID, secretKey: secretKey });
    // const idempotenceKey = 'jnsdvskv-dakdaskdjn-asclnkajdn'
    const createPayload: ICreatePayment = {
      amount: {
        value: `${sum + deliveryPrice}`,
        currency: 'RUB'
      },
      confirmation: {
        type: 'redirect',
        return_url: 'https://syncsound.ru/?payment_confirmation=true'
      }
    };

    try {
      const checkout: any = await create_yookassa_payment(createPayload)
      console.log(checkout)
      localStorage.setItem("payment_id", checkout.data.id)
      addOffer(email, tel, name, sum, `${payment}-orderID=${checkout.data.id}`)
      window.location.href = checkout.data.confirmation.confirmation_url ?? ""
    } catch (error) {
      console.error(error);
    }
  }

  const deferredCities = useDeferredValue(deliveryCities?.filter((city: any) => town ? city.name.toLowerCase().includes(town.toLowerCase()) : true) ?? [])
  const deferredPVZ = useDeferredValue(deliveryPVZ?.filter((pvz) => pvz.city == town).filter((pvz: any) => pvzAddress ? pvz.address.includes(pvzAddress) : true) ?? [])

  if (isLoading) return <Preloader />

  return (
    <Dialog.Root open={emailConfirmationDialog} onOpenChange={setEmailConfirmationDialog} >
      <div>
        <div>
          <Header />
        </div>
        <div className={styles.basket_wrapper}>
          <h2 className={styles.basket_title}>Оформление заказа</h2>
          <div className={styles.basket_block}>
            <h3 className={styles.basket__block_title}>Проверьте содержимое заказа</h3>
            <div className={styles.basket__items_block}>
              {basketListJSX.length ? <BasketList basketList={basketListJSX} sum={sum} /> : <span className='text-20 exo-2 text-white'> Кажется в Вашей корзине пусто( Будем рады, если положите что-то в неё... </span>}
            </div>
          </div>
          <div className={styles.basket_block}>
            <h3 className={styles.basket__block_title}>Внесите данные для оформления заказа</h3>
            <div className={styles.basket__person_block}>
              <input maxLength={72} autoComplete='' onChange={e => setName(e.target.value)} defaultValue={UserStore.user.name} placeholder='Ваше ФИО (полностью)*' required type="name" />
              <span className='w-full'>
                <input autoComplete='email' onChange={e => setEmail(e.target.value)} defaultValue={UserStore.user.email} placeholder='Электронная почта*' required type="email" />
                <span>
                  {/* {isEmailConfirmed ? <div className='bg-[#33ff4e] text-center text-[#fff] py-1 px-3 mb-3 rounded-xl'> Подтвержден </div> : <button onClick={e => { emailConfirmationHandler() }} className='bg-[#ffcc33] text-[#131313] py-1 px-3 mb-3 rounded-xl'> {emailConfirmationInput ? "Отправить еще раз" : (confirmationPending ? "Отправляем..." : "Подтвердить")} </button>}
                  {emailConfirmationInput ? (
                    <>
                      <input type="number" onChange={e => setConfirmationCode(e.target.value)} placeholder='Код подтверждения' />
                      <button onClick={emailConfirmationCheck} className='bg-[#33ff4e] text-[#fff] py-1 px-3 mb-3 rounded-xl' > {checkConfirmationPending ? "Проверка..." : "Подтвердить"} </button>
                    </>
                  ) : <></>} */}
                </span>
              </span>
              <input autoComplete='' value={tel} maxLength={12} onChange={e => {
                setTel(e.target.value)
                if (e.target.value.length == 1) {
                  if (e.target.value == '+') {
                    setTel(prev => e.target.value)
                  } else if (e.target.value == '8') {
                    setTel(prev => `+7`)
                  } else setTel(prev => `+7${e.target.value}`)
                }
              }} defaultValue={UserStore.user.tel} placeholder='Мобильный телефон*' required type="" />
            </div>
          </div>
          <div className={styles.basket__double_block}>
            <div className={styles.basket_block}>
              <h3 className={styles.basket__block_title}>Выберите адрес доставки</h3>
              <div className={styles.basket__address_block}>
                {/* <select onChange={e => setTown(e.target.value)} name="" id="">
                  <option value="Санкт-Петербург">Санкт-Петербург</option>
                  <option value="Москва">Москва</option>
                </select> */}
                <div className='flex flex-row items-center justify-center w-max gap-2 text-white mb-4 ml-4 exo-2'>
                  <label className={` ${deliveryType && ' text-neutral-500 '} transition-all duration-200 `} htmlFor=""> {isMobile ? "Пункт выдачи" : "Доставка в ПВЗ"} </label>
                  <Switch.Root
                    onClick={e => setDeliveryType(!deliveryType)}
                    className="w-[42px] h-[25px] bg-[#131313] rounded-full relative shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-pointer"
                    id="airplane-mode"
                    style={{}}
                  >
                    <Switch.Thumb
                      className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                  </Switch.Root>
                  <label className={` ${!deliveryType && ' text-neutral-500 '} transition-all duration-200 `} htmlFor=""> {isMobile ? "Курьер" : "Курьерская доставка"} </label>
                </div>
                <Combobox >
                  <Combobox.Input required className={classNames(styles.address__block_input, styles.address__block_input_big)} placeholder='Город*' value={town} onChange={e => setTown(e.target.value)} autoComplete='none' />
                  <Combobox.Options className={'absolute mt-2 z-10 overflow-y-scroll bar bg-[#161616] text-white rounded-2xl px-3 py-4 w-full top-[170px] max-h-96 '}>
                    {deferredCities.map((city: any) =>
                      <Combobox.Option key={city.code} onClick={e => setTown(city.name)} className={'py-2 px-3 mt-1 hover:bg-333 transition-all duration-200 rounded-lg cursor-pointer '} value={city.name}>
                        {city.name}
                      </Combobox.Option>
                    )}
                  </Combobox.Options>
                </Combobox>
                {/* <input autoComplete='town' onChange={e => setTown(e.target.value)} placeholder='Город' className={styles.address__block_input + ' ' + styles.address__block_input_big} type="text" /> */}
                {deliveryType ? (
                  <div className={` animation-content-show `}>
                    <input autoComplete='zip' onChange={e => setPostIndex(e.target.value)} placeholder='Почтовый индекс*' className={styles.address__block_input + ' ' + styles.address__block_input_big} type="metro" />
                    <input autoComplete='street' onChange={e => { setStreet(prev => e.target.value) }} required placeholder='Улица*' className={styles.address__block_input + ' ' + styles.address__block_input_big} type="street" />
                    <div className={styles.mini_inputs_box}>
                      <input onChange={e => setHouse(e.target.value)} required placeholder='Дом (корпус / строение)*' className={styles.address__block_input} type="house" />
                      <input onChange={e => setApartment(e.target.value)} placeholder='Квартира (необязательно)' className={styles.address__block_input} type="apartment" />
                    </div>
                  </div>
                ) : (
                  <Combobox >
                    <Combobox.Input required className={classNames(styles.address__block_input, styles.address__block_input_big)} placeholder='Адрес ПВЗ*' value={pvzAddress} onChange={e => setPvzAddress(e.target.value)} autoComplete='none' />
                    <Combobox.Options className={'absolute mt-2 z-10 overflow-y-scroll bar bg-[#161616] text-white rounded-2xl px-3 py-4 w-full top-[230px] max-h-96 '}>
                      {deferredPVZ.map((pvz: any) =>
                        <Combobox.Option key={pvz.code} onClick={e => deliveryPriceHandler(pvz.code, sum.toString(), pvz.address)} className={'py-2 px-3 mt-1 hover:bg-333 transition-all duration-200 rounded-lg cursor-pointer '} value={pvz.address}>
                          {pvz.address}
                        </Combobox.Option>
                      )}
                    </Combobox.Options>
                  </Combobox>
                )}
              </div>
            </div>
            <div className={styles.basket_block + ' flex flex-col justify-between'}>
              <h3 className={styles.basket__block_title}>Выберите способ оплаты</h3>
              <div className={styles.basket__payment_block}>
                <span onClick={() => setPayment(PAYMENT__WHEN_GET)} className={(payment === PAYMENT__WHEN_GET ? styles.payment_active : ' ') + ' cursor-pointer'}>При получении</span>
                <span onClick={() => setPayment(PAYMENT__CARD)} className={(payment === PAYMENT__CARD ? styles.payment_active : ' ') + ' ' + ' cursor-pointer'}>Картой онлайн (не работает, тестовый режим!) </span>
                {/* <span onClick={() => setPayment(PAYMENT__WHEN_GET)} className={(payment === PAYMENT__SBP ? styles.payment_active : '') + ' ' + 'text-neutral-500 line-through'}>Система быстрых платежей (СБП)</span> */}
              </div>
              <div className='flex flex-col mt-10 justify-end items-end w-full'>
                <span className='exo-2 max-w-[340px] text-white text-24 flex flex-col justify-end items-end w-full'>
                  {deliveryPrice ? `Стоимость доставки: ${Math.ceil(Number(deliveryPrice))}` : (
                    <span className='text-18 text-right relative'>
                      {deliveryPricePending ? <PreloaderMini /> : (deliveryType ? "Введите почтовый индекс, чтобы узнать примерную стоимость доставки" : "Выберите город и пункт выдачи, чтобы узнать примерную стоимость доставки")}
                    </span>
                  )}
                </span>
                <span className={`exo-2 text-white ${isMobile ? "text-26 mt-6" : "text-32"} flex flex-col justify-end items-end w-full`}>
                  Итого: {Math.ceil(Number(sum + deliveryPrice))}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.basket__takeOffer_btn}>
            <InvertBtn onClick={() => { emailConfirmationHandler() }} className={`min-h-[92px] w-full ${offerPending && 'bg-white'} `}> {offerPending ? <PreloaderMini /> : 'Оформить заказ'} </InvertBtn>
            <span className='text-neutral-500 mt-4 '> Подтверждая адрес электронной почты и нажимая кнопку "Оформить заказ" вы принимаете <a className='underline text-neutral-400' target='_blank' href={policy}>Пользовательское соглашение</a> и <br /> <a className='underline text-neutral-400' target='_blank' href={conditions}>Условия предоставления товаров</a> </span>
          </div>
        </div>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#131313] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-white m-0 text-[17px] font-medium">
              Подтверждение электронной почты
            </Dialog.Title>
            <Dialog.Description className="text-neutral-300 mt-[10px] mb-5 text-[15px] leading-normal">
              Подтвердите введённый адрес электронной почты. На него был выслан код подтверждения.
            </Dialog.Description>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <input
                onChange={e => setConfirmationCode(e.target.value)}
                className="text-white bg-333 shadow-yellow-300 focus:shadow-yellow-500 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="username"
                placeholder='012345'
              />
            </fieldset>
            {confirmIncorrect && <span className='text-red-600 p-0 m-0'> Некорректный код подтверждения </span>}
            <div className="mt-[25px] flex justify-end">
              <Button asChild>
                <button onClick={e => {
                  if (emailConfirmationCheck()) {
                    setEmailConfirmationDialog(false)
                    if (payment === PAYMENT__WHEN_GET) {
                      addOffer(email, tel, name, sum, payment)
                      setTimeout(() => {
                        window.location.href = 'https://syncsound.ru/?payment_confirmation=true'
                      }, 250);
                    } else if (payment === PAYMENT__CARD) {
                      createYooKassaPayment()
                    } else if (!payment) {
                      ErrorStore.setError(WARNING_ALERT, "Пожалуйста, выберите способ оплаты")
                    }
                  } else {
                    setConfirmIncorrect(true)
                  }
                }} className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  Подтвердить
                </button>
              </Button>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-yellow-400 hover:bg-333 focus:shadow-yellow-400 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
        {isMobile ? <MobileFooter /> : <Footer />}
        <ScrollRestoration />
      </div>
    </Dialog.Root>
  );
})