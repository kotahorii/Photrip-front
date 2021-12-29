import { memo, VFC } from 'react'

type Props = {
  onClick: () => void
  title: string
}
export const ShopSearchButton: VFC<Props> = memo(({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 w-full border-solid text-blue-400 border-blue-400 transition duration-300 hover:bg-blue-100 focus:outline-none border-2 rounded"
    >
      {title}
    </button>
  )
})
