import React from 'react'
import AddPosition from '../components/AddPosition/AddPosition'
import add_1 from '../../../public/img/acton-3_1.png'
import add_2 from '../../../public/img/acton-3_2.png'
import add_3 from '../../../public/img/acton-3_3.png'
import add_4 from '../../../public/img/acton-3_4.png'



const Info = [
  {
    img: add_1 ,
    header: 'НАПОЛНЯЮЩИЙ ПОМЕЩЕНИЕ ЗВУК',
    description: 'Acton III имеет еще более широкий звуковой диапазон, чем ее предшественница, обеспечивая фирменное звучание Marshall, которое было модернизировано для более полного погружения в пространство. Новое поколение Acton оснащено динамиками, расположенными под углом к корпусу и обновленными волноводами, обеспечивающими стабильно плотный звук, который настолько широк, что будет преследовать вас по всей комнате. Acton 3 также оснащена функцией Dynamic Loudness, которая регулирует тональный баланс звука, чтобы ваша музыка звучала великолепно на любой громкости.'
  },
  {
    img: add_2 ,
    header: 'BLUETOOTH СЛЕДУЮЩЕГО ПОКОЛЕНИЯ',
    description: 'Acton III готов к будущей технологии Bluetooth и создан для обеспечения функций Bluetooth нового поколения сразу после их появления. Обновления по воздуху (OTA) через приложение гарантируют, что ваша колонка всегда будет иметь новейшее программное обеспечение и функции. Эта перспективная технология обеспечит более высокое качество звука, увеличит дальность потоковой передачи и улучшит синхронизацию звука.'
  },
  {
    img: add_3 ,
    header: 'ОБЪЕДИНЯЙТЕСЬ, СЛУШАЙТЕ И НАСЛАЖДАЙТЕСЬ ГРОМКОСТЬЮ',
    description: 'Acton III - это устройство прямого назначения, поэтому вы можете просто подключить его и наслаждаться музыкой, не утруждая себя сложной настройкой. Все необходимое находится прямо на устройстве, поэтому вы можете легко управлять музыкой, не поднимая его.'
  },
  {
    img: add_4 ,
    header: 'КУЛЬТОВЫЙ ДИЗАЙН, КОТОРЫЙ ВЫДЕЛЯЕТСЯ СРЕДИ ДРУГИХ',
    description: 'Компания Marshall взяла за основу свою фирменную рок-н-ролльную линейку домашних колонок и придала ей строгий внешний вид, громко заявляющий о себе. Ее культовый дизайн отбрасывает все другие колонки с полки. Фирменные детали, такие как шрифт Marshall и латунные ручки управления, украшают колонки, повторяя наследие рок-н-ролла. Выберите подходящую вам расцветку - оригинальный черный, винтажный кремовый или спокойный коричневый.'
  },
]

export const Acton3Add = () => {
  return (
    <div className='mt-32'>
      {Info.map((obj, index) => <AddPosition className={index == 1 ? 'pl-0' : ''} key={obj.header} img={obj.img} header={obj.header} description={obj.description} reverse={(index + 1) % 2 == 0} />)}
    </div>
  )
}