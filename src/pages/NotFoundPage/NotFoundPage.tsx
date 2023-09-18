import React from 'react';
import { Header } from '../../components/Header';
import styles from './notfoundpage.css';

export function NotFoundPage() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className='content'>
        <div>404 ERROR</div>
        <div>PAGE IS NOT FOUND</div>
      </div>
    </div>
  );
}
