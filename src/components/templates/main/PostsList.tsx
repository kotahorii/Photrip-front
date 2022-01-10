import { prefectures } from 'data/prefecture'
import { useMain } from 'hooks/useMain'
import { useSearch } from 'hooks/useSearch'
import { memo, VFC } from 'react'
import { Post } from 'types/postType'
import { LoadingCard } from '../../organisms/card/LoadingCard'
import { PostCard } from '../../organisms/card/PostCard'

type Props = {
  posts: Post[] | undefined
}

// 投稿一覧を表示するコンポーネント
export const PostsList: VFC<Props> = memo(({ posts }) => {
  const { filteredPosts, searchPrefecture } = useSearch()
  const { isLoadingPosts } = useMain()

  // バックエンドからデータを取得する間はロード用のコンポーネントを表示
  if (isLoadingPosts)
    return (
      <>
        {[...Array(5)]
          .map((_, i) => i)
          ?.map((i) => (
            <LoadingCard key={i} />
          ))}
      </>
    )
  return (
    <>
      {/* 都道府県でフィルターをかけて残ったものだけを表示 */}
      {filteredPosts(posts)
        ?.map((post) =>
          post?.prefecture === prefectures[searchPrefecture - 1] ||
          prefectures[searchPrefecture - 1] === '都道府県を選択'
            ? post
            : undefined
        )
        .filter((data) => data !== undefined)
        .map((post) =>
          !post ? null : <PostCard key={post?.id} post={post} />
        )}
    </>
  )
})
