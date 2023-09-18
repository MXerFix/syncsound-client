import React from 'react'
import AddPosition from '../components/AddPosition/AddPosition'
import add_1 from '../../../public/img/middleton_1.png'
import add_2 from '../../../public/img/middleton_2.png'
import add_3 from '../../../public/img/middleton_3.png'




const Info = [
  {
    img: add_1 ,
    header: 'ОПТИМИЗИРОВАНА ДЛЯ ГРОМКОСТИ',
    description: 'Носите самый лучший портативный звук в руке. В Middleton используется True Stereophonic, уникальная форма многонаправленного стереозвука от Marshall, чтобы обеспечить максимальное погружение в атмосферу, где бы вы ни находились.'
  },
  {
    img: add_3 ,
    header: '20+ ЧАСОВ ИГРЫ В ПОРТАТИВНОМ РЕЖИМЕ',
    description: 'Middleton поддерживает музыку в течение 20+ часов портативного воспроизведения на одной зарядке. Когда вам понадобится зарядить свое устройство, подключите колонку к сети, и вы получите полную зарядку всего за 4,5 часа - следующий выход на бис не заставит себя долго ждать.'
  },
  {
    img: add_2 ,
    header: 'УСИЛЬТЕ ЗВУК С ПОМОЩЬЮ РЕЖИМА STACK',
    description: 'Подключите Middleton к любому количеству других динамиков Middleton и усильте звук с помощью стековых сеансов с несколькими динамиками. Сложите их друг на друга или разложите горизонтально для получения колоссального звука, который подойдет для любого помещения. Наполняете ли вы музыкой комнату или устраиваете вечеринку на улице, Middleton обеспечит звук, который будет настолько объемным, насколько хватит вашего воображения.'
  },
]

export const MiddletonAdd = () => {
  return (
    <div className='mt-32'>
      {Info.map((obj, index) => <AddPosition className={index == 1 ? 'pl-0' : ''} key={obj.header} img={obj.img} header={obj.header} description={obj.description} reverse={(index+1)%2 == 0} />)}
    </div>
  )
}
