import { VFC } from 'react'

type Props = {
  title: string
  length: number | undefined
}

export const HotelOrRestrauntTitle: VFC<Props> = ({ title, length }) => {
  return (
    <div className="flex flex-row justify-between px-3 items-center space-x-5">
      <div className="md:w-24 w-10"></div>
      <h1>{title}</h1>
      <p className=" text-sm bg-blue-500 text-white px-3 py-2 rounded-sm">
        {length}件の結果
      </p>
    </div>
  )
}
