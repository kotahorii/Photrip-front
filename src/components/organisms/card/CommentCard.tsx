import { CustomUserIcon } from 'components/molecules/userIcon/CustomUserIcon'
import { useDetailPost } from 'hooks/useDetailPost'
import { useMain } from 'hooks/useMain'
import { memo, VFC } from 'react'
import { Comment } from 'types/postType'

type Props = {
  comment: Comment
}

export const CommentCard: VFC<Props> = memo(({ comment }) => {
  const { commentsUser } = useDetailPost()
  const { formatDate } = useMain()
  return (
    <div className="w-full p-2 flex flex-col space-y-2 shadow-sm rounded-lg bg-gray-50">
      <div className="flex flex-row items-center space-x-3">
        <CustomUserIcon user={commentsUser(comment)} />
        <div className="flex flex-col space-y-1">
          <p className="font-semibold">{commentsUser(comment)?.name}</p>
          <p className="text-xs">{formatDate(comment.createdAt)}</p>
        </div>
      </div>
      <p className="break-words">{comment.comment}</p>
    </div>
  )
})
