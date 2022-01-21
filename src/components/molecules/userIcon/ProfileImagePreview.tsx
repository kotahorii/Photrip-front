import { UserCircleIcon, XCircleIcon } from '@heroicons/react/solid'
import { useAuth } from 'hooks/useAuth'
import { memo, VFC } from 'react'

type Props = {
  onClick: () => void
}

// プロフィール画像投稿のときのプレビューを表すコンポーネント
export const ProfileImagePreview: VFC<Props> = memo(({ onClick }) => {
  const { preview, resetPreview } = useAuth()
  return preview ? (
    <div className="relative w-28 h-28 px-2 py-2 ">
      <XCircleIcon
        onClick={resetPreview}
        className="absolute right-4 top-1 cursor-pointer w-7 text-gray-300 transition duration-300 hover:text-gray-400"
      />
      <div onClick={onClick} className="cursor-pointer w-20 h-20">
        <img
          src={preview}
          alt="preview img"
          className=" object-cover w-20 h-20 cursor-pointer rounded-full shadow"
        />
      </div>
    </div>
  ) : (
    <div onClick={onClick} className="cursor-pointer w-24 h-24">
      <UserCircleIcon className="w-24 h-24 text-gray-200 transition duration-300 hover:text-gray-300" />
    </div>
  )
})
