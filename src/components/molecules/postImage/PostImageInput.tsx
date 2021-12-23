import { useMain } from 'hooks/useMain'
import { memo, useRef } from 'react'
import { PostImagePreview } from './PostImagePreview'

export const PostImageInput = memo(() => {
  const { postImageChange } = useMain()
  const inputRef = useRef<any>(null)

  const fileUpload = () => {
    inputRef.current.click()
  }
  return (
    <>
      <PostImagePreview onClick={fileUpload} />
      <input
        hidden
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={postImageChange}
      />
    </>
  )
})
