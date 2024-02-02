import React from 'react';
import { Header } from '../../components/Header';
import styles from './notfoundpage.css';

export function NotFoundPage() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div style={{ fontFamily: 'Exo2' }} className='px-10 flex flex-col text-32 max-sm:text-20 items-center justify-center h-[80vh]'>
        <div className=' text-white max-w-3xl text-center'>Кажется, такой страницы не существует или произошла доселе неизведанная ошибка. <br /> Вы можете обратиться в нашу  </div>
        <a className='bg-white text-black my-2 px-2 py-1 rounded' target='_blank' href="https://t.me/mxerf_dev">тех.поддержду</a>
        <div className=' text-white'>404 Page is not found :{'('} </div>
      </div>
    </div>
  );
}
