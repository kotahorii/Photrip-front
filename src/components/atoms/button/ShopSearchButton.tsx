import { memo, VFC } from 'react'

type Props = {
  onClick: () => void
  title: string
}

// ホテル、レストランを検索するボタン
export const ShopSearchButton: VFC<Props> = memo(({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 md:w-full w-11/12 border-solid text-blue-500 border-blue-500 transition duration-300 hover:bg-blue-500 hover:text-white focus:outline-none border-2 rounded"
    >
      {title}
    </button>
  )
})
