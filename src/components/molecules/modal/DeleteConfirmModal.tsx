import { TrashIcon } from '@heroicons/react/outline'
import { memo, VFC } from 'react'

type Props = {
  onClick: () => void
}

export const DeleteConfirmModal: VFC<Props> = memo(({ onClick }) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <p>本当に削除しますか?</p>
      <button
        onClick={onClick}
        className="flex flex-row justify-center items-center space-x-1 transition duration-300 bg-red-500 hover:bg-red-600 focus:outline-none text-white px-5 py-2 rounded-full"
      >
        <TrashIcon className="w-5" />
        <p>削除</p>
      </button>
    </div>
  )
})
