import { StarIcon as SolidStar } from '@heroicons/react/solid'
import { StarIcon as OutLineStar } from '@heroicons/react/outline'
import { memo } from 'react'
import { useRates } from 'hooks/useRate'

export const RateInput = memo(() => {
  const { rate, rateCreate, rateUpdate } = useRates()
  return (
    <div className="flex flex-row">
      {rate === undefined ? (
        [...Array(5)]
          .map((_, i) => i)
          .map((i) => (
            <OutLineStar
              onClick={rateCreate(i + 1)}
              className="w-6 h-6 text-gray-400 rounded-full transition duration-300 hover:bg-gray-200 hover:text-yellow-400 cursor-pointer"
              key={i}
            />
          ))
      ) : (
        <>
          {[...Array(rate)]
            .map((_, i) => i)
            .map((i) => (
              <SolidStar
                onClick={rateUpdate(i + 1)}
                className="w-6 h-6 text-yellow-400 rounded-full transition duration-300 hover:bg-gray-200 cursor-pointer"
                key={i}
              />
            ))}
          {[...Array(5 - rate)]
            .map((_, i) => i)
            .map((i) => (
              <OutLineStar
                onClick={rateUpdate(i + rate + 1)}
                className="w-6 h-6 text-gray-400 rounded-full transition duration-300 hover:bg-gray-200 hover:text-yellow-400 cursor-pointer"
                key={i}
              />
            ))}
        </>
      )}
    </div>
  )
})
