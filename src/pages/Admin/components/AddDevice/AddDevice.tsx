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
import { fetchColors } from '../../../../http/colorsApi';
import ColorsStore from '../../../../store/ColorsStore';

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
  const [info_file, setInfoFile] = useState<any>('')
  const [additions, setAdditions] = useState<any[]>([])
  const [additionFiles, setAdditionFiles] = useState<{ number: number, file: File | null }[]>([])

  const addAddition = (e: any) => {
    e.preventDefault()
    const newNumber = Date.now()
    setAdditionFiles([...additionFiles, { number: newNumber, file: null }])
    setAdditions([...additions, { title: 'Заголовок', description: 'Абзац с описанием', number: newNumber }])
  }
  const deleteAddition = (deleted: number) => {
    setAdditions(additions.filter((item) => item.number !== deleted))
  }
  const changeAddition = (key: any, value: string, number: number) => {
    setAdditions(additions.map((item) => item.number === number ? { ...item, [key]: value } : item))
  }

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

  const default_colors = toJS(ColorsStore.colors).map((item) =>
    <option key={item.id} value={item.name}>
      {item.name}
    </option>
  )

  const [color, setColor] = useState('')


  const selectFile = (e: any) => {
    setFile(e.target.files[0])
  }

  const selectInfoFile = (e: any) => {
    setInfoFile(e.target.files[0])
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
    color: color,
  })

  const addDevice = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('oldPrice', oldPrice)
    formData.append('color', color)
    formData.append('brandName', brand)
    formData.append('categoryName', type)
    formData.append('bigDescription', bigDescription)
    formData.append('img', file)
    formData.append('info_file', info_file)
    formData.append('additions', JSON.stringify(additions))
    additionFiles.forEach((file) => {
      if (file.file) {
        formData.append('addition_images', file.file)
      }
    })
    try {
      const response = await createDevice(formData)
      // color.forEach(async (el, index) => {
      //   const formData = new FormData()
      //   formData.append('color', el.color)
      //   formData.append('deviceName', el.deviceName)
      //   for (let file of additionalImages[index + 1]) {
      //     formData.append('additionalImages', file)
      //   }
      //   const response = await createDevice(formData)
      // })
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
      color: color,
    });
    // color.forEach((el) => {
    //   el.deviceName = name
    // })
  }, [name, description, price, oldPrice, brand, type, bigDescription, file, color])





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
              <select required onChange={(e) => { setColor(e.target.value); }} name="" id="color_select">
                <option value="">Выбрать цвет...</option>
                {default_colors}
              </select>
            </div>
            <div className=' mt-8'>
              <label htmlFor=""> Контент на странице <span className='text-12 inline-block'>(необязательно, если верстается вручную)</span> </label>
              <button className='text-333 bg-white rounded px-2 py-1 mb-4' onClick={e => addAddition(e)}> Добавить блок </button>
              <div>
                {additions.map((item, idx) =>
                  <div key={item.number} className='mb-3 flex flex-col' >
                    <input onChange={(e) => changeAddition('title', e.target.value, item.number)} type="text" placeholder={item.title} />
                    <textarea className='text-10 h-20 w-full' onChange={(e) => changeAddition('description', e.target.value, item.number)} placeholder={item.description} />
                    <input accept='image/png' className='hidden' onChange={(e: any) => setAdditionFiles(additionFiles.map((i) => {
                      if (i.number === item.number) {
                        const result: { number: number, file: File | null } = {
                          number: i.number,
                          file: e.target.files[0]
                        }

                        return result
                      } else return i
                    }))} type="file" id={`img_${item.number}`} />
                    <label htmlFor={`img_${item.number}`}>
                      <p className='bg-yellow-300 text-333 px-2 py-1 rounded text-14 cursor-pointer w-max m-0'> {additionFiles.find((obj) => obj.number === item.number)?.file?.name ?? 'Изображение'}   </p>
                    </label>
                    <button className='bg-red-500 text-white px-1 text-14 rounded w-max ' onClick={(e) => { e.preventDefault(); deleteAddition(item.number); setAdditionFiles(additionFiles.filter((i) => item.number !== i.number)) }} > Удалить </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.in_form__side}>
            <div className={classNames(styles.add_infos, 'flex flex-col')}>
              <label htmlFor="">Характеристики</label>
              <button className='text-white'> Прикрепить файл с характеристиками в формате JSON (category, title, value) </button>
              <input accept='application/json' className='hidden' placeholder='Выбрать файл с характеристиками' type="file" name="info_file" id="info_file" onChange={e => selectInfoFile(e)} />
              <label className='cursor-pointer bg-white px-2 py-1 rounded' htmlFor="info_file">
                <p className='text-333 text-18 w-max '> {info_file ? info_file.name : 'Выбрать файл с характеристиками'} </p>
              </label>
              {/* <button onClick={(e) => { e.preventDefault(); addInfo(); }}>Добавить характеристику</button>
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
              </div> */}
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




