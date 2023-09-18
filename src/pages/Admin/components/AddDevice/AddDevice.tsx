import classNames from 'classnames';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import Preloader from '../../../../components/Preloader/Preloader';
import { createDevice } from '../../../../http/deviceAPI';
import BrandsStore from '../../../../store/BrandsStore';
import TypesStore from '../../../../store/TypesStore';
import InvertBtn from '../../../../UI/InvertBtn/InvertBtn';
import styles from '../../admin.css'

const obj = {
  colors: ['black', 'brown'],
  images: [['img1', 'img2'], ['img1', 'img2']]
}



export interface AddDeviceI {
  [propKey: string]: any
}

export const AddDevice = observer(({ className, cancelFn, ...props }: AddDeviceI) => {

  const [isLoading, setIsLoading] = useState(false)



  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [oldPrice, setOldPrice] = useState('')
  const [bigDescription, setBigDescription] = useState('')
  const [type, setType] = useState('')
  const [brand, setBrand] = useState('')
  const [file, setFile] = useState('')

  const [additionalImages, setAdditionalImages] = useState([['additional images array started from 1st index']])


  const types = toJS(TypesStore.types).map((item) =>
    <option key={item.id} value={item.name}>
      {item.name}
    </option>
  )

  const brands = toJS(BrandsStore.brands).map((item) =>
    <option key={item.id} value={item.name}>
      {item.name}
    </option>
  )

  const [color, setColor] = useState([{ color: 'Введите цвет', deviceName: 'Название товара', number: Date.now() }])
  const addColor = () => {
    setColor([...color, { color: 'Введите цвет', deviceName: "Название товара", number: Date.now() }])
  }
  const deleteColor = (deleted: number) => {
    setColor(color.filter((item) => item.number !== deleted))
  }
  const changeColor = (key: any, value: string, number: number) => {
    setColor(color.map((item) => item.number === number ? { ...item, [key]: value } : item))
  }

  const [info, setInfo] = useState([{ title: 'Название', description: 'Описание', category: 'Заголовок', number: Date.now() }])
  const addInfo = () => {
    setInfo([...info, { title: 'Название', description: 'Описание', category: 'Заголовок', number: Date.now() }])
  }
  const deleteInfo = (deleted: number) => {
    setInfo(info.filter((item) => item.number !== deleted))
  }
  const changeInfo = (key: any, value: string, number: number) => {
    setInfo(info.map((item) => item.number === number ? { ...item, [key]: value } : item))
  }

  const selectFile = (e: any) => {
    setFile(e.target.files[0])
  }

  const selectManyFiles = (e: any) => {
    setAdditionalImages([...additionalImages, e.target.files])
  }

  const [device, setDevice] = useState({
    name: name,
    description: description,
    price: parseInt(price),
    oldPrice: parseInt(oldPrice),
    brandName: brand,
    categoryName: type,
    bigDescription: bigDescription,
    img: file,
    info: info,
    color: color,
    additionalImages: additionalImages
  })

  const addDevice = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('oldPrice', oldPrice)
    formData.append('brandName', brand)
    formData.append('categoryName', type)
    formData.append('bigDescription', bigDescription)
    formData.append('img', file)
    formData.append('info', JSON.stringify(info))
    try {
      const response = await createDevice(formData)
      color.forEach(async (el, index) => {
        const formData = new FormData()
        formData.append('color', el.color)
        formData.append('deviceName', el.deviceName)
        for (let file of additionalImages[index + 1]) {
          formData.append('additionalImages', file)
        }
        const response = await createDevice(formData)
      })
    } catch (error) {
      return console.log(error);
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    setDevice({
      name: name,
      description: description,
      price: parseInt(price),
      oldPrice: parseInt(oldPrice),
      brandName: brand,
      categoryName: type,
      bigDescription: bigDescription,
      img: file,
      info: info,
      color: color,
      additionalImages: additionalImages
    });
    color.forEach((el) => {
      el.deviceName = name
    })
  }, [name, description, price, oldPrice, brand, type, bigDescription, file, info, color, additionalImages])



  if (isLoading) return <Preloader />

  return (
    <div className={className}>
      <form action="" className={styles.device_add__form}>
        <div className={styles.in_form__wrapper}>
          <div className={styles.in_form__side}>
            <div className={styles.in_form__select}>
              <label htmlFor="#category_select">Категория</label>
              <select required onChange={(e) => { setType(e.target.value); }} name="" id="category_select">
                <option value="">Выбрать категорию...</option>
                {types}
              </select>
            </div>
            <div className={styles.in_form__select}>
              <label htmlFor="#brand_select">Бренд</label>
              <select required onChange={(e) => { setBrand(e.target.value); }} name="" id="brand_select">
                <option value="">Выбрать бренд...</option>
                {brands}
              </select>
            </div>
            <div className={styles.in_form__input}>
              <label htmlFor="">Название</label>
              <input required onChange={(e) => { setName(e.target.value); }} type="text" name="deviceName" id="addDeviceForm_name" />
            </div>
            <div className={styles.in_form__input}>
              <label htmlFor="">Описание</label>
              <input required onChange={(e) => { setDescription(e.target.value) }} type="text" name="deviceDescription" id="addDeviceForm_description" />
            </div>
            <div className={styles.in_form__input}>
              <label htmlFor="">Главное изображение</label>
              <input required onChange={(e) => { selectFile(e) }} type="file" name="mainImg" id="" />
            </div>
            <div className={styles.in_form__input}>
              <label htmlFor="">Цена</label>
              <input required onChange={(e) => { setPrice(e.target.value) }} type="number" name="devicePrice" id="addDeviceForm_price" />
            </div>
            <div className={styles.in_form__input}>
              <label htmlFor="">Цена без скидки</label>
              <input required onChange={(e) => { setOldPrice(e.target.value) }} type="number" name="deviceOldPrice" id="addDeviceForm_oldPrice" />
            </div>
          </div>
          <div className={styles.in_form__side}>
            <div className={styles.add_bigDescription}>
              <label htmlFor="addDeviceForm_bigDescription"> Описание на странице товара </label>
              <textarea required onChange={(e) => { setBigDescription(e.target.value) }} defaultValue='Эти прекрасные наушники славятся...' name="bigDescription" id="addDeviceForm_bigDescription"></textarea>
            </div>
            <div className={styles.add_colors}>
              <label htmlFor="">Цвет</label>
              <button onClick={(e) => { e.preventDefault(); addColor(); }}>Добавить цвет</button>
              <div>
                {color.map((item, index) =>
                  <div className={styles.color_box} key={item.number}>
                    <input onChange={(e) => { changeColor('color', e.target.value, item.number); }} type="text" placeholder={item.color} />
                    <button onClick={(e) => { e.preventDefault(); deleteColor(item.number) }} >Удалить</button>
                    <div className={styles.more_photo_box}>
                      <label className={styles.mini_label} htmlFor="">3 доп фото к цвету</label>
                      <input onChange={(e) => { selectManyFiles(e) }} type="file" multiple name="additional_photos" id="" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.in_form__side}>
            <div className={styles.add_infos}>
              <label htmlFor="">Характеристики</label>
              <button onClick={(e) => { e.preventDefault(); addInfo(); }}>Добавить характеристику</button>
              <div>
                {info.map((item) =>
                  <div key={item.number}>
                    <select onChange={(e) => changeInfo('category', e.target.value, item.number)} placeholder={item.category}>
                      <option value="">{item.category}</option>
                      <option value="Аудио">Аудио</option>
                      <option value="Батарея">Батарея</option>
                      <option value="Управление">Управление</option>
                      <option value="В комплекте">В комплекте</option>
                      <option value="Питание">Питание</option>
                      <option value="Описание">Описание</option>
                      <option value="Дополнительно">Дополнительно</option>
                    </select>
                    <input onChange={(e) => changeInfo('title', e.target.value, item.number)} type="text" placeholder={item.title} />
                    <input onChange={(e) => changeInfo('description', e.target.value, item.number)} type="text" placeholder={item.description} />
                    <button onClick={(e) => { e.preventDefault(); deleteInfo(item.number) }} > Удалить </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttons_box}>
          <InvertBtn onClick={cancelFn} > Отмена </InvertBtn>
          <InvertBtn onClick={(e: any) => { e.preventDefault(); addDevice(e); }} > Добавить </InvertBtn>
        </div>
      </form>
    </div>
  )
})




