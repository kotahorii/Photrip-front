import { memo, VFC } from 'react'

type Props = {
  title: string
  length: number | undefined
}

// 施設のタイトル(ホテルかレストランか)と施設の検索数を表示するコンポーネント
export const HotelOrRestrauntTitle: VFC<Props> = memo(({ title, length }) => {
  return (
    <>
      <div className="flex flex-row justify-center items-center space-x-3">
        <h1>{title}</h1>
        <p className="text-sm bg-blue-500 text-white px-3 py-2 rounded-sm">
          {length}件の結果
        </p>
      </div>
    </>
  )
})
