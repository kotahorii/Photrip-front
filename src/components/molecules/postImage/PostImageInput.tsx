import { useMain } from 'hooks/useMain'
import { memo, useRef } from 'react'
import { PostImagePreview } from './PostImagePreview'

// 投稿画像の入力フォームコンポーネント
export const PostImageInput = memo(() => {
  const { postImageChange } = useMain()
  const inputRef = useRef<any>(null)

  const fileUpload = () => {
    inputRef.current.click()
  }
  return (
    <>
      {/* プレビューをクリックしてインプットに画像をセットできる */}
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
