import React from 'react'
import AddPosition from '../components/AddPosition/AddPosition'
import add_1 from '../../../public/img/stanmore-2_1.png'
import add_2 from '../../../public/img/stanmore-2_2.png'
import add_3 from '../../../public/img/stanmore-2_3.png'


const Info = [
  {
    img: add_1 ,
    header: 'БЕСПРОВОДНОЕ ПОДКЛЮЧЕНИЕ',
    description: 'Bluetooth 5.0 и технология aptX обеспечивают беспроводное звучание без потерь на расстоянии до 10 метров. Используйте смартфон, планшет или компьютер с поддержкой Bluetooth для потоковой передачи музыки непосредственно на колонку без использования проводов.'
  },
  {
    img: add_3 ,
    header: 'КУЛЬТОВЫЙ ДИЗАЙН MARSHALL',
    description: 'Классические детали Marshall, такие как текстурированное виниловое покрытие, решетка "соль и перец" и знаменитый шрифтовой логотип, украшают прочную деревянную раму этой колонки. На передней панели колонки расположена латунная пластина с выгравированной датой основания 1962 года - тонкий намек на наследие бренда и его более чем 50-летнюю историю. Вы захотите с гордостью выставить эту колонку в любой комнате.'
  },
  {
    img: add_2 ,
    header: 'ПРИЛОЖЕНИЕ MARSHALL BLUETOOTH',
    description: 'В дополнение к аналоговым ручкам управления вы можете использовать приложение Marshall Bluetooth для настройки вашего воспроизведения или управления музыкой, которую вы слушаете. С помощью приложения можно переключаться между предварительными настройками эквалайзера, устанавливать стерео или окружающий режим и регулировать интенсивность светодиодных индикаторов на верхней панели. Вы также можете разбудить колонку или перевести ее в режим ожидания в считанные секунды.'
  },
]

export const Stanmore2Add = () => {
  return (
    <div className='mt-32'>
      {Info.map((obj, index) => <AddPosition key={obj.header} img={obj.img} header={obj.header} description={obj.description} reverse={(index + 1) % 2 == 0} />)}
    </div>
  )
}
