import { memo } from 'react'

export const LoadingCommentCard = memo(() => {
  return (
    <div className="w-full p-2 flex flex-col space-y-2 rounded-lg bg-gray-50">
      <div className="flex flex-row space-x-3">
        <div className="rounded-full w-16 h-16 bg-gray-200"></div>
        <div className="flex flex-col space-y-1">
          <div className="h-8 w-36 rounded-lg bg-gray-200"></div>
          <div className="h-6 w-36 rounded-lg bg-gray-200"></div>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <div className="w-full h-6 bg-gray-200 rounded-lg"></div>
        <div className="w-full h-6 bg-gray-200 rounded-lg"></div>
        <div className="w-full h-6 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  )
})
