import { useApi } from 'hooks/useApi'
import { memo } from 'react'
import { HotelRestaurantCard } from '../../organisms/card/HotelRestaurantCard'
import { LoadingHotelCard } from '../../organisms/card/LoadingHotelCard'

export const HotelModal = memo(() => {
  const { rakutenData, isLoadingRakuten, isRefetchingRakuten } = useApi()
  return (
    <ul className="flex flex-col overflow-auto w-full h-96 p-2">
      {isLoadingRakuten || isRefetchingRakuten
        ? [...Array(4)]
            .map((_, i) => i)
            ?.map((i) => <LoadingHotelCard key={i} />)
        : rakutenData?.map((rakuten) => (
            <HotelRestaurantCard
              key={rakuten.hotel[0].hotelBasicInfo?.hotelNo}
              src={rakuten.hotel[0].hotelBasicInfo?.hotelImageUrl}
              href={rakuten.hotel[0].hotelBasicInfo?.hotelInformationUrl}
              reviewUrl={rakuten.hotel[0].hotelBasicInfo?.reviewUrl}
              title={rakuten.hotel[0].hotelBasicInfo?.hotelName}
              special={rakuten.hotel[0].hotelBasicInfo?.hotelSpecial}
              address={`${rakuten.hotel[0].hotelBasicInfo?.address1}${rakuten.hotel[0].hotelBasicInfo?.address2}`}
            />
          ))}
    </ul>
  )
})
