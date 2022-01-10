import { memo, useCallback, VFC } from 'react'
import { Post } from 'types/postType'
import { StarIcon } from '@heroicons/react/solid'
import { LikeButton } from 'components/atoms/button/LikeButton'
import { Link } from 'react-router-dom'
import { useRates } from 'hooks/useRate'
import { useMain } from 'hooks/useMain'
import { XIcon } from '@heroicons/react/outline'
import { useQueryDetailPost } from 'hooks/queries/useQueryDetailPost'
import { useApi } from 'hooks/useApi'

type Props = {
  post: Post
}

export const PostCard: VFC<Props> = memo(({ post }) => {
  const { averageRate } = useRates()
  const { formatDate } = useMain()
  const { closeHotelModal, closeShopModal } = useApi()
  const { openDeletePostModal, currentUser } = useMain()
  const { refetch: refetchDetailPost } = useQueryDetailPost(post.id)
  const moveToDetailPage = useCallback(() => {
    refetchDetailPost()
    closeHotelModal()
    closeShopModal()
  }, [closeHotelModal, closeShopModal, refetchDetailPost])

  // 投稿カードのコンポーネント
  return (
    <div className="flex md:flex-row relative flex-col m-2 items-center md:space-x-5 cursor-pointer md:w-3/5 max-w-2xl w-80 px-5 py-4 shadow hover:shadow-lg transition duration-300 rounded space-y-3">
      {post.image.url !== null || '' ? (
        <Link
          onClick={moveToDetailPage}
          to={`/${post.id}`}
          className=" w-72 h-52 rounded"
        >
          <img
            className="w-full h-full rounded shadow object-cover"
            src={post.image.url}
            alt="post"
          />
        </Link>
      ) : (
        <Link
          onClick={moveToDetailPage}
          to={`/${post.id}`}
          className=" w-72 h-52 relative bg-gray-200 rounded"
        >
          <p className=" absolute text-xl font-semibold text-gray-400 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            No image
          </p>
        </Link>
      )}
      <div className="flex flex-col md:h-52 md:w-2/3 w-full py-2 space-y-2">
        <Link
          onClick={moveToDetailPage}
          className="flex flex-col space-y-2"
          to={`/${post.id}`}
        >
          <div className="h-10 rounded max-w-xs">
            <h1 className="text-xl truncate overflow-ellipsis">{post.title}</h1>
          </div>
          <div className="h-16 md:block hidden rounded max-w-xs">
            <p className="text-lg text-gray-400 truncate overflow-ellipsis whitespace-nowrap">
              {post.body}
            </p>
          </div>
          <div className="h-6 flex flex-col space-y-1 rounded max-w-xs">
            <p>
              {post.prefecture}
              <span className="mx-2">{post.city}</span>
              {post.town}
            </p>
            <p className="text-xs text-gray-400">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </Link>

        {/* いいねボタンといいね数を表示 */}
        <div className="flex flex-row relative mt-5 justify-between items-center px-2">
          <div className=" flex flex-row items-center h-8 mt-2 mr-2 rounded-full">
            <LikeButton post={post} />
            <span>{post.favorites.length}</span>
          </div>

          {/* 評価の平均値を表示 */}
          <div className="h-8 w-24 mt-2 flex flex-row justify-between items-center">
            <StarIcon className="w-6 text-yellow-500" />
            <p className="flex flex-row">
              {averageRate(post)?.toString() !== 'NaN'
                ? averageRate(post)?.toString()
                : 0}
              <span className="text-gray-400 ml-0.5">
                ({post.rates.length}件)
              </span>
            </p>
          </div>

          <div className="w-16"></div>
        </div>
      </div>

      {/* 投稿したユーザーだけが削除できる処理 */}
      {post.userId === currentUser?.id && (
        <XIcon
          onClick={openDeletePostModal(post)}
          className="absolute right-1 top-0 cursor-pointer w-7 h-7 rounded-full p-1 text-gray-400 hover:bg-gray-100"
        />
      )}
    </div>
  )
})
