import { useAuth } from 'hooks/useAuth'
import { memo, useRef } from 'react'
import { ProfileImagePreview } from './ProfileImagePreview'

// プロフィール画像の入力フォームコンポーネント
export const ProfileImageInput = memo(() => {
  const { imageChange } = useAuth()
  const inputRef = useRef<any>(null)

  const fileUpload = () => {
    inputRef.current.click()
  }
  return (
    <>
      {/* プレビューをクリックしてインプットに画像をセットできる */}
      <ProfileImagePreview onClick={fileUpload} />
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
