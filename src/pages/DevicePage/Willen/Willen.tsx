import React from 'react'
import AddPosition from '../components/AddPosition/AddPosition'
import add_1 from '../../../public/img/willen_1.png'
import add_2 from '../../../public/img/willen_2.png'
import add_3 from '../../../public/img/willen_3.png'



const Info = [
  {
    img: add_1 ,
    header: 'ВРЕМЯ РАБОТЫ, КОТОРОЕ ВАС НЕ ПОДВЕДЕТ',
    description: 'Willen готова к использованию в любое время, где бы вы ни находились, ведь ее время работы на одном заряде составляет более 15 часов. Если Вам потребуется подпитать аккумулятор, 3 часа зарядки полностью восстановят его работоспособность.'
  },
  {
    img: add_2 ,
    header: 'ОБЪЕДИНЯЙТЕСЬ, СЛУШАЙТЕ И НАСЛАЖДАЙТЕСЬ ГРОМКОСТЬЮ',
    description: 'Willen - это кратчайший путь между вами и музыкой: просто установите и слушайте без всяких сложных настроек. Если хотите настроить звук, можете выбрать одну из трех предварительных настроек эквалайзера в приложении.'
  },
  {
    img: add_3,
    header: 'ПОДКЛЮЧАЙТЕ БОЛЬШЕ КОЛОНОК С ПОМОЩЬЮ STACK РЕЖИМА',
    description: 'Режим Stack Mode повышает уровень, обеспечивая звучание, превосходящее Willen. Усильте звук с помощью многоколоночной сессии, подключив свою колонку к другим колонкам Willen. Создайте звук, который будет настолько мощным, насколько хватит вашего воображения.'
  },
]

const WillenAdd = () => {
  return (
    <div className='mt-32'>
      {Info.map((obj, index) => <AddPosition key={obj.header} img={obj.img} header={obj.header} description={obj.description} reverse={(index+1)%2 == 0} />)}
    </div>
  )
}

export default WillenAdd