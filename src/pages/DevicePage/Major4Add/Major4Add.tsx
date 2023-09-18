import React from 'react'
import AddPosition from '../components/AddPosition/AddPosition'
import add_1 from '../../../public/img/major_4_add1.png'
import add_2 from '../../../public/img/major_4_add2.png'
import add_3 from '../../../public/img/major_4_add3.png'


const Info = [
  {
    img: add_1 ,
    header: 'БЕСПРОВОДНАЯ ЗАРЯДКА',
    description: 'Наушники Major IV можно заряжать по беспроводной сети, так что теперь заряжать и использовать стало проще, чем когда-либо. Наушники можно положить на подставку для зарядки, а матовая силиконовая окантовка ушной раковины гарантирует, что они не будут перемещаться. Тратьте меньше времени на поиски зарядного устройства в путанице проводов и больше времени на прослушивание музыки. Беспроводная зарядка не входит в комплект**.'
  },
  {
    img: add_2 ,
    header: 'ДЛИТЕЛЬНОЕ ИСПОЛЬЗОВАНИЕ',
    description: 'Major IV обеспечивает более 80 часов беспроводного воспроизведения с возможностью быстрой зарядки – всего 15 минут зарядки обеспечат вам 15 часов прослушивания.'
  },
  {
    img: add_3,
    header: 'ФИРМЕННЫЙ ЗВУК',
    description: 'Специально настроенные динамические драйверы обеспечивают ревущие басы, плавные средние и блестящие высокие частоты для богатого, непревзойденного звука, который вы никогда не захотите отключать.'
  },
]

const Major4Add = () => {
  return (
    <div className='mt-32'>
      {Info.map((obj, index) => <AddPosition key={obj.header} img={obj.img} header={obj.header} description={obj.description} reverse={(index+1)%2 == 0} />)}
    </div>
  )
}

export default Major4Add