import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

type AlertModalType = {
  alertType: string
  children: any
  error?: number
}

export const WARNING_ALERT = 'warning_alert'
export const ERROR_ALERT = 'error_alert'
export const GREEN_ALERT = 'green_alert'

export const ErrorModal = ({ alertType, children, error }: AlertModalType) => {

  const modal_ref = document.querySelector('#modal_root')
  if (!modal_ref) {
    return <></>
  }

  const PortalModal = ReactDOM.createPortal(<ErrorModalPortal alertType={alertType}> {children} </ErrorModalPortal>, modal_ref)

  return (
    <>
      {error != 0 && PortalModal}
    </>
  )
}

const ErrorModalPortal = ({ alertType, children }: AlertModalType) => {

  const alertTypeBackgroundHandler = (type: string) => {
    switch (type) {
      case WARNING_ALERT: return 'bg-yellow-400 text-333'
      case ERROR_ALERT: return 'bg-red-500 text-white'
      case GREEN_ALERT: return 'bg-green-400 text-white'
    }
  }

  return (
    <div className='fixed flex flex-col top-0 items-center w-full h-max'>
      <span className={`${alertTypeBackgroundHandler(alertType)} z-10 text-center w-80 p-1 rounded top-32 relative modal-anim`}>
        {children}
      </span>
    </div>
  )
}
