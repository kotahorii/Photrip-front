import { memo, VFC } from 'react'

type Props = {
  onClick: () => void
  title: string
}
export const ShopSearchButton: VFC<Props> = memo(({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 border-solid text-indigo-800 border-indigo-800 transition duration-300 hover:bg-indigo-100 focus:outline-none border-2 rounded-lg"
    >
      {title}
    </button>
  )
})
