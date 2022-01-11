import { SearchIcon } from '@heroicons/react/outline'
import { memo, VFC } from 'react'

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// 検索フォームのコンポーネント
export const SearchInput: VFC<Props> = memo(({ value, onChange }) => {
  return (
    <>
      <SearchIcon className="absolute w-6 h-6 text-gray-500 ml-2 top-1/4" />
      <input
        type="search"
        className=" bg-gray-200 py-3 pl-10 pr-2 rounded w-full ring-blue-400 focus:ring-2 focus:outline-none focus:bg-transparent"
        placeholder="キーワードで検索"
        value={value}
        onChange={onChange}
      />
    </>
  )
})
