import { TrashIcon } from '@heroicons/react/outline'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'

export const DeletePostModal = memo(() => {
  const { detailUserPost, deletePost } = useMain()

  return (
    <div className="flex flex-row items-center justify-between">
      <p>本当に削除しますか?</p>
      <button
        onClick={deletePost(detailUserPost.id)}
        className="flex flex-row justify-center items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full"
      >
        <TrashIcon className="w-5" />
        <p>削除</p>
      </button>
    </div>
  )
})
