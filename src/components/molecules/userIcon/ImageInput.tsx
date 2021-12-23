import { ImagePreview } from './ImagePreview'
import { useAuth } from 'hooks/useAuth'
import { memo, useRef } from 'react'

export const ImageInput = memo(() => {
  const { imageChange } = useAuth()
  const inputRef = useRef<any>(null)

  const fileUpload = () => {
    inputRef.current.click()
  }
  return (
    <>
      <ImagePreview onClick={fileUpload} />
      <input
        hidden
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={imageChange}
      />
    </>
  )
})
