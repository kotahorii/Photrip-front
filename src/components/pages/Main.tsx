import { LoadingCard } from 'components/organisms/card/LoadingCard'
import { Layout } from 'components/templates/Layout'
import { useSearch } from 'hooks/useSearch'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'
import { CustomSelector } from 'components/atoms/form/CustomSelector'
import { prefectures } from 'data/prefecture'
import { RadioButton } from 'components/atoms/button/RadioButton'
import { PostsList } from 'components/organisms/main/PostsList'
import { RadioData } from 'data/radioData'
import { SearchIcon } from '@heroicons/react/outline'

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
    rateAve,
  } = useSearch()
  console.log(posts?.map((post) => rateAve(post)))
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
          <div className="md:w-96 w-full relative">
            {/* <CustomInput
              name="search"
              placeholder="ラベルとタイトルで絞り込み"
              value={searchedLabel}
              onChange={changeSearchedLabel}
            /> */}
            <SearchIcon className="absolute w-6 h-6 text-gray-500 ml-2 top-1/4" />
            <input
              type="search"
              className=" bg-gray-200 py-3 pl-10 rounded-md w-full ring-blue-500 focus:ring-2 focus:outline-none focus:bg-transparent"
              placeholder="キーワードで検索"
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
          <p className=" w-28 border-2 border-blue-800 text-blue-800 rounded-lg text-center py-1">
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
