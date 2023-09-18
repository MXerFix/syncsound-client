import React from 'react';
import UserStore from '../../store/UserStore';
import { Form } from './components/Form/Form';
import { Socials } from './components/Socials/Socials';
import styles from './contacts.css';
import InvertBtn from '../../UI/InvertBtn/InvertBtn';
import axios from 'axios';
import { $host } from '../../http';
import { send_offer_to_me } from '../../http/emailAPI';

interface contactsInterface {
  [propKey: string]: any,
}


const EmailHTML = (emailHTMLData: any) => {
  return (
    <div className='bg-neutral-500 w-full flex flex-col font-sans items-center justify-center p-8'>
      <div className='bg-white flex flex-col py-4 px-6 justify-start items-start shadow-xl rounded-lg'>
        <h2 className='font-semibold text-32 w-max mx-auto'> Код подтверждения </h2>
        <p className='w-max mx-auto text-24'> <strong>{emailHTMLData.confirmation} 999222</strong> </p>
        <p>С уважением, команда syncsound!</p>
      </div>
    </div>
  )
}


export function Contacts({ ...props }: contactsInterface) {
  return (
    <div {...props} className={styles.contacts__wrapper}>
      {/* <Form className={styles.form} /> */}
      {/* <InvertBtn onClick={(e: any) => send()} > test </InvertBtn> */}
      <Socials className={styles.socials} />
      {/* <EmailHTML /> */}
    </div>
  );
}
