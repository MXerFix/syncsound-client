import React from 'react';
import InvertBtn from '../../UI/InvertBtn/InvertBtn';
import styles from './banner.css';

export function Banner() {
  return (
    <div className={styles.banner_wrapper}>
      <div className={styles.banner__wrapper_box}>
        <h1 className={styles.banner__wrapper_title}>MARSHALL</h1>
        <span className={styles.banner__wrapper_description} >культовый звук</span>
        {/* <button className={styles.banner__wrapper_button} onClick={() => document.getElementById('contacts')?.scrollIntoView({behavior:'smooth', block: 'center'})} > <p>Выбрать</p> </button> */}
        <InvertBtn onClick={() => document.getElementById('catalog')?.scrollIntoView({behavior:'smooth', block: 'start'})} >Выбрать</InvertBtn>
      </div>
    </div>
  );
}
