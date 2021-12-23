import { memo } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const SuccessToast = memo(() => {
  return (
    <ToastContainer
      position="top-left"
      autoClose={3000}
      closeOnClick
      draggable
    />
  )
})
