import classNames from 'classnames'
import React from 'react'
import { AddDeviceI } from '../../../Admin/components/AddDevice/AddDevice'
import styles from '../../basket.css'

export const BasketList = ({basketList, sum}: AddDeviceI) => {
  return (
    <div>
      {basketList}
      <div className={classNames(styles.sum_text, 'flex items-end justify-end text-32')}>
        Сумма заказа: {sum}
      </div>
    </div>
  )
}
