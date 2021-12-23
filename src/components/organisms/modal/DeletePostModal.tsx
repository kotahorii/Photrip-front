import { XIcon, TrashIcon } from '@heroicons/react/outline'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'

export const DeletePostModal = memo(() => {
  const { detailUserPost, deletePost, closeDeletePostModal } = useMain()

  return (
    <div className="flex flex-col mt-5 space-y-4 md:w-80 w-72">
      <p>本当に削除しますか?</p>
      <div className="flex flex-row justify-between">
        <div></div>
        <div className="flex flex-row">
          <div
            onClick={closeDeletePostModal}
            className="flex flex-row hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
          >
            <XIcon className="w-5" />
            <p>キャンセル</p>
          </div>
          <div
            onClick={deletePost(detailUserPost.id)}
            className="flex flex-row hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
          >
            <TrashIcon className="w-5" />
            <p>削除</p>
          </div>
        </div>
      </div>
    </div>
  )
})
