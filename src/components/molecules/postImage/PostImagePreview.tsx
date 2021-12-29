import { XCircleIcon, PhotographIcon } from '@heroicons/react/outline'
import { useMain } from 'hooks/useMain'
import { memo, VFC } from 'react'

type Props = {
  onClick: () => void
}

export const PostImagePreview: VFC<Props> = memo(({ onClick }) => {
  const { postPreview, resetPostPreview } = useMain()
  return postPreview ? (
    <div className="relative w-80 h-56  ">
      <XCircleIcon
        onClick={resetPostPreview}
        className="absolute -right-1 -top-1 cursor-pointer w-7 text-gray-200 transition duration-300 hover:text-gray-300"
      />
      <div onClick={onClick} className="cursor-pointer w-80 h-52">
        <img
          src={postPreview}
          alt="preview img"
          className=" object-cover w-full h-full rounded cursor-pointer shadow"
        />
      </div>
    </div>
  ) : (
    <div
      onClick={onClick}
      className="cursor-pointer relative w-80 h-80 bg-gray-200 transition duration-300 hover:bg-gray-300 rounded"
    >
      <PhotographIcon className="absolute w-7 text-gray-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  )
})
