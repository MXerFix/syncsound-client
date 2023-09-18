import React from 'react'
import AddPosition from '../components/AddPosition/AddPosition'
import add_2 from '../../../public/img/acton-2_1.png'
import add_4 from '../../../public/img/acton-3_4.png'



const Info = [
  {
    img: add_2 ,
    header: 'БЕСПРОВОДНОЕ ПОДКЛЮЧЕНИЕ',
    description: 'Bluetooth 5.0 обеспечивает превосходное беспроводное звучание на расстоянии до 10 метров при сохранении возможности подключения. Используйте смартфон, планшет или компьютер с поддержкой Bluetooth для потоковой передачи музыки непосредственно на колонку без использования проводов.'
  },
  {
    img: add_4 ,
    header: 'КУЛЬТОВЫЙ ДИЗАЙН, КОТОРЫЙ ВЫДЕЛЯЕТСЯ СРЕДИ ДРУГИХ',
    description: 'Компания Marshall взяла за основу свою фирменную рок-н-ролльную линейку домашних колонок и придала ей строгий внешний вид, громко заявляющий о себе. Ее культовый дизайн отбрасывает все другие колонки с полки. Фирменные детали, такие как шрифт Marshall и латунные ручки управления, украшают колонки, повторяя наследие рок-н-ролла. Выберите подходящую вам расцветку - оригинальный черный, винтажный кремовый или спокойный коричневый.'
  },
]

export const Acton2Add = () => {
  return (
    <div className='mt-32'>
      {Info.map((obj, index) => <AddPosition key={obj.header} img={obj.img} header={obj.header} description={obj.description} reverse={(index + 1) % 2 == 0} />)}
    </div>
  )
}
