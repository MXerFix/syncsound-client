import React from 'react'
import AddPosition from '../components/AddPosition/AddPosition'
import add_1 from '../../../public/img/woburn2_1.png'
import add_2 from '../../../public/img/woburn2_2.png'



const Info = [
  {
    img: add_1 ,
    header: 'НАСТРАИВАЙТЕ СВОЕ ЗВУЧАНИЕ',
    description: 'Настройте свою музыку в соответствии с вашими требованиями. Просто используйте приложение Marshall Bluetooth или аналоговые регуляторы на верхней панели колонки, чтобы улучшить звучание в зависимости от помещения, в котором вы находитесь.'
  },
  {
    img: add_2 ,
    header: 'ПРОВОДНОЕ ПОДКЛЮЧЕНИЕ',
    description: 'Для подключения существует больше способов, чем просто Bluetooth 5.0. Подключитесь к RCA или 3,5 мм входу для аналогового прослушивания.'
  },
]

export const Woburn2Add = () => {
  return (
    <div className='mt-32'>
      {Info.map((obj, index) => <AddPosition key={obj.header} img={obj.img} header={obj.header} description={obj.description} reverse={(index+1)%2 == 0} />)}
    </div>
  )
}
