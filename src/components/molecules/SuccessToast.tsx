import { memo } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// 投稿成功時などに現れるトーストのコンポーネント
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
