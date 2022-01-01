import { memo } from 'react'

export const LoadingCard = memo(() => {
  return (
    <div className="flex md:flex-row animate-pulse flex-col m-2 items-center md:space-x-5 cursor-pointer md:w-3/5 max-w-2xl w-80 px-5 py-4 shadow-md hover:shadow-lg rounded-lg space-y-3">
      <div className=" w-72 h-52 bg-gray-200 rounded-lg"></div>
      <div className="flex flex-col md:h-52 md:w-2/3 w-full py-2 space-y-2">
        <div className=" bg-gray-200 h-10 rounded-lg"></div>
        <div className=" bg-gray-200 h-16 md:block hidden  rounded-lg"></div>
        <div className=" bg-gray-200 h-6 rounded-lg"></div>
        <div className="flex flex-row mt-5 justify-between items-center px-2">
          <div className="w-10 h-8 mt-2 mr-2 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-14 mt-2 bg-gray-200 rounded-full"></div>
          <div className="w-20"></div>
          <div className="h-8 w-28 mt-2"></div>
        </div>
      </div>
    </div>
  )
})
