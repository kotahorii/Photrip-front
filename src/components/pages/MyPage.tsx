import { SelectModeButton } from 'components/atoms/button/SelectModeButton'
import { LoadingCard } from 'components/organisms/card/LoadingCard'
import { PostCard } from 'components/organisms/card/PostCard'
import { Layout } from 'components/templates/Layout'
import { useLikes } from 'hooks/useLikes'
import { useMain } from 'hooks/useMain'
import { useMyPage } from 'hooks/useMyPage'
import { useRates } from 'hooks/useRate'
import { memo } from 'react'

export const MyPage = memo(() => {
  const { isLoadingUser, isLoadingPosts } = useMain()

  const { changePostsMode, postsMode, likedPost, myPost, myPrefecturePosts } =
    useMyPage()

  if (isLoadingPosts || isLoadingUser)
    return (
      <Layout>
        <div className="flex flex-col w-full items-center justify-center">
          {[...Array(18)]
            .map((_, i) => i)
            ?.map((i) => (
              <LoadingCard key={i} />
            ))}
        </div>
      </Layout>
    )
  return (
    <Layout>
      <div className="flex flex-row border-b border-indigo-600 space-x-1">
        <SelectModeButton
          postsMode={postsMode}
          onClick={changePostsMode('myPosts')}
          mode="myPosts"
        >
          自分の投稿
        </SelectModeButton>
        <SelectModeButton
          postsMode={postsMode}
          onClick={changePostsMode('likedPosts')}
          mode="likedPosts"
        >
          いいねした投稿
        </SelectModeButton>
        <SelectModeButton
          postsMode={postsMode}
          onClick={changePostsMode('myPrefecturePosts')}
          mode="myPrefecturePosts"
        >
          自分の都道府県の投稿
        </SelectModeButton>
      </div>

      <div className="flex flex-col w-full items-center justify-center">
        {postsMode === 'likedPosts' &&
          likedPost()?.map((post) => <PostCard key={post.id} post={post} />)}
        {postsMode === 'myPosts' &&
          myPost()?.map((post) => <PostCard key={post.id} post={post} />)}
        {postsMode === 'myPrefecturePosts' &&
          myPrefecturePosts()?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
      </div>
    </Layout>
  )
})
