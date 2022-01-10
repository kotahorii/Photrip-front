import { XIcon } from '@heroicons/react/outline'
import { CustomUserIcon } from 'components/molecules/userIcon/CustomUserIcon'
import { useDetailPost } from 'hooks/useDetailPost'
import { useMain } from 'hooks/useMain'
import { memo, VFC } from 'react'
import { Comment } from 'types/postType'

type Props = {
  comment: Comment
}

// コメントを表示するコンポーネント
export const CommentCard: VFC<Props> = memo(({ comment }) => {
  const { commentsUser } = useDetailPost()
  const { formatDate, currentUser } = useMain()
  const { openDeleteCommentModal } = useDetailPost()
  return (
    <div className="w-full relative p-2 flex flex-col space-y-2 shadow bg-gray-50 rounded">
      <div className="flex flex-row items-center space-x-3">
        <CustomUserIcon user={commentsUser(comment)} />
        <div className="flex flex-col space-y-1">
          <p className="font-semibold">{commentsUser(comment)?.name}</p>
          <p className="text-xs">{formatDate(comment.createdAt)}</p>
        </div>
      </div>
      <p className="break-words whitespace-pre-wrap">{comment.comment}</p>

      {/* 投稿したユーザーだけが削除確認用のモーダルを開くことができる */}
      {comment.userId === currentUser?.id && (
        <XIcon
          onClick={openDeleteCommentModal(comment.id)}
          className="absolute right-1 top-0 cursor-pointer w-7 h-7 p-1 rounded-full text-gray-400 hover:bg-gray-100"
        />
      )}
    </div>
  )
})
