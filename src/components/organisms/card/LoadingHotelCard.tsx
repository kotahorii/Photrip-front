import { memo } from 'react'

// 施設情報を取得しているときに表示するコンポーネント
export const LoadingHotelCard = memo(() => {
  return (
    <li className="bg-gray-50 animate-pulse p-3 border-t border-gray-300 flex items-center flex-row space-x-3 w-full ">
      <div className="w-32 h-24 bg-gray-200 rounded-lg"></div>
      <div className="flex flex-col w-2/3 space-x-1">
        <div className="p-2 h-11 rounded-lg bg-gray-200"></div>
        <div className="flex flex-col space-y-2 mt-2">
          <p className=" h-5 bg-gray-200 rounded-lg"></p>
          <p className="h-5 bg-gray-200 rounded-lg"></p>
          <p className="h-4 bg-gray-200 rounded-lg"></p>
        </div>
      </div>
    </li>
  )
})
