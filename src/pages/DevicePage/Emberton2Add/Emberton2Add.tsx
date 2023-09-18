import React from 'react'
import AddPosition from '../components/AddPosition/AddPosition'
import add_1 from '../../../public/img/emberton2_1.png'
import add_2 from '../../../public/img/emberton2_2.png'
import add_3 from '../../../public/img/emberton2_3.png'


const Info = [
  {
    img: add_1 ,
    header: 'МНОГОКОЛОНОЧНАЯ СЕССИЯ В РЕЖИМЕ STACK MODE',
    description: 'В Emberton II включена функция Stack Mode. Усильте звук с помощью многоколоночной сессии, подключив свою колонку к другим колонкам Emberton II. Создайте звук, который будет настолько масштабным, насколько хватит вашего воображения.'
  },
  {
    img: add_2 ,
    header: 'BLUETOOTH 5.1',
    description: 'Emberton II оснащен технологией Bluetooth 5.1 для простого подключения, исключительного качества звука и беспроводного воспроизведения музыки.'
  },
  {
    img: add_3,
    header: 'ПРОЧНЫЙ ДИЗАЙНС КЛАССОМ ЗАЩИТЫ IP67',
    description: 'Emberton II - прочный и выносливый, с чрезвычайно надежной и простой в использовании конструкцией, имеющей степень пыле- и водонепроницаемости IP67. Дождь или грязь не смогут помешать прослушиванию музыки.'
  },
]

const Emberton2Add = () => {
  return (
    <div className='mt-32'>
      {Info.map((obj, index) => <AddPosition key={obj.header} img={obj.img} header={obj.header} description={obj.description} reverse={(index+1)%2 == 0} />)}
    </div>
  )
}

export default Emberton2Add