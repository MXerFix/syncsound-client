import classNames from 'classnames';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { ScrollRestoration, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ucFirst } from '../..';
import { isMobile } from '../../App';
import { Header } from '../../components/Header';
import { MobileFooter } from '../../components/Mobile/Footer';
import Preloader from '../../components/Preloader/Preloader';
import { fetchBrands } from '../../http/brandsAPI';
import { fetchDevices, fetchOneDevice, fetchSameDevices } from '../../http/deviceAPI';
import { fetchTypes } from '../../http/typesAPI';
import BasketStore from '../../store/BasketStore';
import BrandsStore from '../../store/BrandsStore';
import DeviceStore from '../../store/DeviceStore';
import FavoritesStore from '../../store/FavoritesStore';
import TypesStore from '../../store/TypesStore';
import InvertBtn from '../../UI/InvertBtn/InvertBtn';
import { API_URL, COLOR_BLACK, COLOR_BROWN, COLOR_GREY, COLOR_WHITE, EMBERTON, KULBURN, MAJOR_2, MAJOR_3, MAJOR_4, MID_ANC, PAGE_BLACK, PAGE_BROWN, PAGE_GREY, PAGE_WHITE, SHOP_ROUTE } from '../../utils/consts';
import styles from './devicepage.css';
import { Footer } from '../../components/Footer/Footer';
import AddPosition from './components/AddPosition/AddPosition';
import { TrashIcon } from '@radix-ui/react-icons';
import { Cart } from '../../icons/Cart';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

function chooseColor(nativeColor) {
  switch (nativeColor) {
    case COLOR_BLACK: { return PAGE_BLACK; break }
    case COLOR_BROWN: { return PAGE_BROWN; break }
    case COLOR_GREY: { return PAGE_GREY; break }
    case COLOR_WHITE: { return PAGE_WHITE; break }
  }
}

function whatDevice(deviceName) {
  return -1
}



const DevicePage = observer(() => {

  const params = useParams()
  const devicePageId = parseInt(params.id ? params.id : '')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [device, setDevice] = useState({ info: [{}], colors: [{}], paged_device: [{}], images_for_color: [{}] })
  const [sameDevices, setSameDevices] = useState([])
  const [characters, setCharacters] = useState()

  useEffect(() => {
    const fetchSame = async (id) => {
      await fetchSameDevices(id).then((data) => {
        setSameDevices(data)
        console.log(data)
      })
    }
    fetchOneDevice(devicePageId).then(data => {
      setDevice(data)
      fetchSame(data.id)
      setTimeout(() => {
        setIsLoading(prev => false)
      }, 200);
    })


  }, [])

  const sortColorImagesFn = (images) => {
  }

  const [colorPage, setColorPage] = useState('')
  const [imgList, setImgList] = useState(([[{ img: '', color: colorPage }]]))
  const [mainImg, setMainImg] = useState('')

  useEffect(() => {
    // setImgList(device.images_for_color)
    setMainImg(API_URL + '/' + device.img)
    // setColorPage(device.colors[0].color)
    // sortColorImagesFn(device.images_for_color)
  }, [device])

  // const productsList = toJS(DeviceStore.devices)

  useEffect(() => {
    if (colorPage !== '') {
      setMainImg(API_URL + '/' + imgList.filter(({ color }) => color === colorPage)[0].img)
    }
  }, [colorPage])


  // console.log(productsList)

  // const device = productsList.filter((item) => { return item.id == devicePageId })[0]
  // console.log(device);

  const charactersList = device.paged_device[0].device_info ? JSON.parse(device.paged_device[0].device_info) : ''
  const additionsList = device.paged_device[0].device_additions ? JSON.parse(device.paged_device[0].device_additions) : ''
  // console.log(device.paged_device[0].device_info)
  const modifyCharactersList = () => {
    const characters = {}
    const currCategory = ''
    charactersList.map((character, idx) => {
      const values = {
        title: character.title,
        value: character.value
      }
      if (character.category === currCategory) {
        characters[character.category].push(values)
      } else {
        currCategory = character.category
        characters[character.category] = []
        characters[character.category].push(values)
      }
    })
    setCharacters(characters)
  }

  useEffect(() => {
    if (charactersList && !characters) {
      modifyCharactersList()
    }
  }, [charactersList])



  // const [color, setColor] = useState(device.colors[0])
  const [favorite, setFavorite] = useState(false)
  const [basket, setBasket] = useState(false)


  useEffect(() => {
    if (FavoritesStore.FAVORITES_LIST.filter((item) => { return item === device.id }).length) setFavorite(true)
  }, [favorite, device])

  useEffect(() => {
    if (BasketStore.BASKET_LIST.filter((item) => { return item === device.id }).length) setBasket(true)
  }, [basket, device])

  console.log(sameDevices)



  if (!isLoading) {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div className='content'>
          <div className={styles.deviceBanner + ' pt-12 pb-6'}>
            <div className={styles.deviceBanner_in + ' w-full max-w-[1920px] '}>
              <div className={styles.rightSide}>
                <div className={styles.rightSide_nameBlock}>
                  <h1> {ucFirst(device.brandName)} {device.name} </h1>
                  <p> {device.paged_device[0].bigDescription} </p>
                </div>
                <div className={styles.rightSide_colorANDprice + ' '}>
                  <div className={styles.colorANDprice_color}>
                    <div className=' flex flex-row flex-wrap items-start justify-start gap-2 '>
                      {sameDevices.map((d) => {
                        const split = d.default_color?.value.split(';')
                        let colorArr = d.default_color?.value.replaceAll(';', ` ${100 / (split.length-1)}%,`)
                        if (colorArr[colorArr.length-1] == ',') {
                          colorArr = colorArr.slice(0, -1)
                          console.log(colorArr)
                        }
                        console.log(`linear-gradient(${colorArr})`)
                        return (
                          <div className='cursor-pointer' onClick={() => {
                            setIsLoading(true)
                            try {
                              navigate(`../device/${d.id}`)
                            } catch (error) {
                              console.log(error)
                            } finally {
                              window.location.reload()
                              setTimeout(() => {
                                setIsLoading(false)
                              }, 500);
                            }
                          }}>
                            <span
                              className={'block rounded-full border border-transparent w-10 h-10 SHADOWWWWW'}
                              style={{
                                background: colorArr.length > 8 ? `linear-gradient(to right, ${colorArr})` : colorArr,
                                borderWidth: device.id === d.id && '1.5px',
                                borderColor: ((d.default_color?.value === '#000000' || device.id === d.id) && d.default_color?.value !== '#FFFFFF') ? 'white' : '#666',
                              }}
                            >
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className={styles.colorANDprice_price}>
                    <p className='text-64'>
                      <span> {device.oldPrice ? device.oldPrice + '₽' : ''}  </span>
                      {device.price}₽
                    </p>
                  </div>
                </div>
                <div className={styles.rightSide_buttonsBlock}>
                  {device.count ? (
                    <>
                      <div className='flex flex-row items-center justify-center gap-2'>
                        {basket && (
                          <button
                            className={`flex items-center justify-center ${isMobile ? 'w-12 h-12 rounded-2xl ' : 'px-[18px] py-[12px] rounded-3xl'} bg-red-400`}
                            onClick={e => {
                              e.stopPropagation();
                              // e.preventDefault()
                              BasketStore.removeBasketId(device.id)
                              setBasket(!basket)
                            }} >
                            <TrashIcon color='white' className={isMobile ? 'w-6 h-6' : 'w-10 h-10'} />
                          </button>
                        )}
                        <InvertBtn
                          className={` ${isMobile && ' text-16 py-2 px-3 w-max h-12 '} ${isMobile && basket && 'w-12 h-12 rounded-2xl'} let-spacing-01 `}
                          onClick={(e) => {
                            e.stopPropagation();
                            // e.preventDefault()
                            if (!basket) {
                              setBasket(!basket);
                              BasketStore.addBasketId(device.id)
                              // BasketStore.removeBasketId(id)
                            } else {
                              navigate('/basket')
                            }
                          }}
                          style={basket ? { backgroundColor: "white", border: '0', borderRadius: `${isMobile ? '' : '24px'}`, content: 'В корзине' } : { backgroundColor: "black", borderRadius: '24px', content: 'В корзину' }}
                        >
                          {basket ? <Cart className={isMobile ? 'w-6 h-6' : 'w-9 h-9'} /> : 'В корзину'}
                        </InvertBtn>
                      </div>
                    </>
                  ) : (
                    <InvertBtn className='rounded-[24px] mr-4 let-spacing-01'>
                      <Link preventScrollReset={true} onClick={() => {
                        setTimeout(() => { document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, (650))
                      }} to={`../${SHOP_ROUTE}`}>
                        {!isMobile ? "Уточнить наличие" : "Уточнить"}
                      </Link>
                    </InvertBtn>
                  )}
                  <div><InvertBtn onClick={() => { setFavorite(!favorite); return (favorite ? FavoritesStore.removeFavoriteId(device.id) : FavoritesStore.addFavoriteId(device.id)) }} className={(favorite ? 'rounded-[24px]  let-spacing-01 bg-color_white' : '  rounded-[24px] let-spacing-01') + ' ' + ` ${isMobile && 'py-2 px-3 w-max h-12'} ` } > {favorite ? 'В избранном' : 'В избранное'} </InvertBtn></div>
                </div>
              </div>
              <div className={styles.leftSide}>
                <div>
                  {/* <div className={styles.img_main} > */}
                  <img src={mainImg} className={`scale-110 bg-[rgba(255,255,255,0.025)] rounded-3xl ${isMobile && 'mt-4'} `} alt="" />
                  {/* </div> */}
                  {/* <div className={styles.img_swiper}>
                  {imgList.filter(({color}) => color === colorPage).map((item) =>
                    <div onClick={() => setMainImg(API_URL + item.img)} key={item.id} className={(item.img == mainImg ? classNames(styles.img_swiped, styles.img_active) : styles.img_swiped)} >
                      <img src={API_URL + item.img} alt="" />
                    </div>
                  )}
                </div> */}
                </div>
              </div>
            </div>
          </div>
          <div id='' className={styles.add_block}>
            {
              additionsList?.map((addition, idx) => (
                <AddPosition key={addition.description} className='mt-32' reverse={idx % 2 === 1} header={addition.title} description={addition.description} img={process.env.NODE_ENV === "development" ? `http://localhost:3010/${addition.img}` : `${process.env.REACT_APP_API_URL}/${addition.img}`} />
              ))
            }
          </div>
          <div className={styles.characters}>
            <h2 className={styles.technical_characters_h2 + ' mb-10'}> ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ </h2>
            <div className={styles.technical_characters}>
              {Object.values(characters).map((category, idx) => {
                // console.log(Object.keys(characters)[idx])
                // console.log(category, idx)
                return (
                  <div key={Object.keys(characters)[idx]} className={styles.characters_item}>
                    <h6 className={` ${isMobile ? "text-22 bg-333 py-1 px-3 text-center m-auto rounded" : "text-24"} font-normal w-max max-w-full mb-4 `}> {Object.keys(characters)[idx]} </h6>
                    {category.map((character) => (
                      <div key={character.title} className='mb-2'>
                        <p className={styles.item_h}> {character.title}{character.title[character.title.length - 1] === ':' ? '' : ':'} </p>
                        <p> {character.value} </p>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {isMobile ? <MobileFooter /> : <Footer />}
        <ScrollRestoration />
      </div>
    );
  } else {
    return (
      <Preloader />
    )
  }

})

export default DevicePage