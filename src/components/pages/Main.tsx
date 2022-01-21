import { RadioButton } from 'components/atoms/button/RadioButton'
import { PrefectureSelector } from 'components/atoms/form/PrefectureSelector'
import { SearchInput } from 'components/atoms/form/SearchInput'
import { LoadingCard } from 'components/organisms/card/LoadingCard'
import { Layout } from 'components/templates/Layout'
import { PostsList } from 'components/templates/main/PostsList'
import { prefectures } from 'data/prefecture'
import { RadioData } from 'data/radioData'
import { useMain } from 'hooks/useMain'
import { useSearch } from 'hooks/useSearch'
import { memo } from 'react'

export const Main = memo(() => {
  const { isLoadingUser, isLoadingPosts, posts } = useMain()
  const {
    searchedLabel,
    changeSearchedLabel,
    filteredPosts,
    searchPrefecture,
    changeSearchPrefecture,
    selectedOption,
    favPosts,
    ratePosts,
    rateAvePosts,
  } = useSearch()
  if (isLoadingPosts || isLoadingUser)
    return (
      <Layout>
        <div className="flex flex-col w-full items-center justify-center">
          {[...Array(5)]
            .map((_, i) => i)
            ?.map((i) => (
              <LoadingCard key={i} />
            ))}
        </div>
      </Layout>
    )
  return (
    <Layout>
      <div className=" flex flex-col items-center md:w-9/12 w-11/12 space-y-5">
        <div className=" flex flex-row space-x-1 justify-center items-center">
          <div className="md:w-96 w-full relative">
            <SearchInput value={searchedLabel} onChange={changeSearchedLabel} />
          </div>
          <div className=" w-56">
            <PrefectureSelector
              value={searchPrefecture}
              onChange={changeSearchPrefecture}
              arrays={prefectures}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center justify-center md:space-x-2 md:space-y-0 space-y-5">
          <div className=" grid md:grid-cols-4 grid-cols-2 md:space-x-2 items-center justify-center lg:space-y-0 space-y-1">
            {RadioData.map((data) => (
              <RadioButton key={data.name} data={data} />
            ))}
          </div>
          <p className=" w-28 bg-blue-500 text-white rounded-sm text-center py-3">
            {
              filteredPosts(posts)
                ?.map((post) =>
                  post?.prefecture === prefectures[searchPrefecture - 1] ||
                  prefectures[searchPrefecture - 1] === '都道府県を選択'
                    ? post
                    : undefined
                )
                .filter((data) => data !== undefined).length
            }
            件の結果
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        {selectedOption === '1' ? (
          <PostsList posts={posts} />
        ) : selectedOption === '2' ? (
          <PostsList posts={favPosts(posts)} />
        ) : selectedOption === '3' ? (
          <PostsList posts={rateAvePosts(posts)} />
        ) : (
          <PostsList posts={ratePosts(posts)} />
        )}
      </div>
    </Layout>
  )
})
