import React from 'react';
import styles from './advantages.css';
import Advantage from './components/Advantage/Advantage';
import chart_img from '../../public/img/chart__advantage.svg'
import del_variants_img from '../../public/img/delivery_variants__advantage.svg'
import fast_del_img from '../../public/img/fast_delivery__advantage.svg'
import safety_img from '../../public/img/safety__advantage.svg'
import { isMobile } from '../../App';

export function Advantages() {
  
  const LastAdvNoMobile = `Надежность \n безопасность`
  const LastAdvMobile = `Надежно \n безопасно`

  return (
    <div className={styles.advantages_box}>
      <Advantage img={chart_img}> Гибкий <br /> график </Advantage>
      <Advantage img={fast_del_img}> Доставим <br /> в срок </Advantage>
      <Advantage img={safety_img}> { isMobile ? LastAdvMobile : LastAdvNoMobile }  </Advantage>
    </div>
  );
}
