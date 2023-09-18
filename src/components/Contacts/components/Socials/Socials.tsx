import React from 'react';
import { isMobile } from '../../../../App';
import styles from './socials.css';
import telegram from '../../../../public/img/telegram.svg'
import whatsapp from '../../../../public/img/whatsapp.svg'
import email from '../../../../public/img/email.svg'

export function Socials({ className }: { className?: string }) {
  return (
    <div className={className}>
      <h2 className='title_exo2_contacts'> {isMobile ? "Контакты" : "Написать нам:"} </h2>
      {isMobile ? (
        <div className={styles.socials_wrapper_mobile} >
          <div className={styles.mobile_item}>
            <a className={styles.mobile_item_a} target='_blank' href={"https://t.me/syncsoundshop"}>
              <img src={telegram} alt="" />
              <span className={styles.mobile_item_a_name}> Telegram </span>
            </a>
          </div>
          <div className={styles.mobile_item}>
            <a className={styles.mobile_item_a} target='_blank' href={"https://wa.me/89951052901"}>
              <img src={whatsapp} alt="" />
              <span className={styles.mobile_item_a_name}> WhatsApp </span>
            </a>
          </div>
          <div className={styles.mobile_item}>
            <a className={styles.mobile_item_a} target='_blank' href={"mailto:syncsoundshop@gmail.com"}>
              <img src={email} alt="" />
              <span className={styles.mobile_item_a_name}> Email </span>
            </a>
          </div>
        </div>
      ) : (
        <div className={styles.socials_wrapper} >
          <a id={styles.socials_telegram} className={styles.socials__wrapper_item} target='_blank' href="https://t.me/syncsoundshop" > <span className=' relative z-10 roboto text-20 '>Telegram</span> </a>
          <a id={styles.socials_whatsapp} className={styles.socials__wrapper_item} target='_blank' href="https://wa.me/89951052901" > <span className=' relative z-10 roboto text-20 '>WhatsApp</span> </a>
          <a id={styles.socials_email} className={styles.socials__wrapper_item} target='_blank' href="mailto:syncsoundshop@gmail.com" > <span className=' relative z-10 roboto text-20 '>Email</span> </a>
        </div>
      )}
    </div>
  );
}
