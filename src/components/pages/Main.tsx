import { CustomInput } from 'components/atoms/form/CustomInput'
import { LoadingCard } from 'components/organisms/card/LoadingCard'
import { Layout } from 'components/templates/Layout'
import { useSearch } from 'hooks/useSearch'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'
import { CustomSelector } from 'components/atoms/form/CustomSelector'
import { prefectures } from 'data/prefecture'
import { useLikes } from 'hooks/useLikes'
import { RadioButton } from 'components/atoms/button/RadioButton'
import { PostsList } from 'components/organisms/main/PostsList'
import { RadioData } from 'data/radioData'
import { useRates } from 'hooks/useRate'

export const Main = memo(() => {
  const { isLoadingUser, isLoadingPosts, posts } = useMain()
  const {
    searchedLabel,
    changeSearchedLabel,
    filteredPosts,
    searchPrefecture,
    changeSearchPrefecture,
    selectedOption,
    favPostsData,
    rateAveData,
    ratePostsData,
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
      <div className=" flex flex-col items-center md:w-7/12 w-11/12 space-y-5">
        <div className=" flex flex-row space-x-1 justify-center items-center">
          <div className="md:w-96 w-full">
            <CustomInput
              name="search"
              placeholder="タグで絞り込み"
              value={searchedLabel}
              onChange={changeSearchedLabel}
            />
          </div>
          <div className=" w-56">
            <CustomSelector
              value={searchPrefecture}
              onChange={changeSearchPrefecture}
              arrays={prefectures}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 items-center justify-center  md:w-11/12 lg:space-y-0 space-y-1">
          <RadioButton radioData={RadioData} />
          <p className=" w-28 border-2 border-indigo-800 text-indigo-800 rounded-lg text-center py-1">
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
          <PostsList posts={favPostsData} />
        ) : selectedOption === '3' ? (
          <PostsList posts={rateAveData} />
        ) : (
          <PostsList posts={ratePostsData} />
        )}
      </div>
    </Layout>
  )
})
