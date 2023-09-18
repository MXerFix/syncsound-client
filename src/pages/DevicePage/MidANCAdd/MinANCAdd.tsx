import React from 'react'
import AddPosition from '../components/AddPosition/AddPosition'
import add_1 from '../../../public/img/mid_anc_add1.png'
import add_2 from '../../../public/img/mid_anc_add2.png'
import add_3 from '../../../public/img/mid_anc_add3.png'
import add_4 from '../../../public/img/mid_anc_add4.png'



const Info = [
  {
    img: add_1 ,
    header: 'АКТИВНОЕ ШУМОПОДАВЛЕНИЕ',
    description: 'Mid А.N.С. – наушники с активным шумоподавлением, которые используют четыре микрофона для непрерывного измерения и определения окружающего шума, чтобы блокировать то, что вы не хотите слышать. Теперь вы можете сосредоточиться на том, что важнее всего - на музыке.'
  },
  {
    img: add_2 ,
    header: 'ТЕХНОЛОГИЯ BLUETOOTH atpX',
    description: 'Bluetooth aptX не только воспроизводит музыку с более высокой скоростью передачи битов, но и минимизирует проблемы с синхронизацией аудио / видео, позволяя смотреть фильмы с идеальной синхронизацией губ. Это также дает вам свободу передвижения с 30-футовым беспроводным диапазоном прослушивания.'
  },
  {
    img: add_3,
    header: 'ДО 20 ЧАСОВ ВОСПРОИЗВЕДЕНИЯ С ШУМОПОДАВЛЕНИЕМ',
    description: 'MID А.N.С. предлагает до 20 часов беспроводного воспроизведения при активном шумоподавлении и включенном Bluetooth или более 30 часов беспроводного воспроизведения без ANC.'
  },
  {
    img: add_4,
    header: 'ПРЕМИАЛЬНЫЕ МАТЕРИАЛЫ И ДИЗАЙН',
    description: 'Mid А.N.С. – наушники с плюшевой головкой, обернутые мягкой микрофиброй, а логотип Marshall с латунным покрытием и отделка из черного анодированного металла придают этим наушникам культовый вид.'
  },
]

const MidANCAdd = () => {
  return (
    <div className='mt-32'>
      {Info.map((obj, index) => <AddPosition key={obj.header} img={obj.img} header={obj.header} description={obj.description} reverse={(index+1)%2 == 0} />)}
    </div>
  )
}

export default MidANCAdd