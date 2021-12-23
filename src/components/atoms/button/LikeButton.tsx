import { memo, VFC } from 'react'
import { HeartIcon as SolidLike } from '@heroicons/react/solid'
import { HeartIcon as OutLineLike } from '@heroicons/react/outline'
import { useLikes } from 'hooks/useLikes'
import { Post } from 'types/postType'

type Props = {
  post: Post
}

export const LikeButton: VFC<Props> = memo(({ post }) => {
  const { isLiked, toggleLike } = useLikes()
  return (
    <>
      {isLiked(post) ? (
        <SolidLike
          onClick={toggleLike(post)}
          className="w-8 p-1 text-red-400 rounded-full transition duration-300 hover:bg-gray-200 cursor-pointer"
        />
      ) : (
        <OutLineLike
          onClick={toggleLike(post)}
          className="w-8 p-1 text-gray-400 rounded-full transition duration-300 hover:bg-gray-200 hover:text-red-400 cursor-pointer"
        />
      )}
    </>
  )
})
