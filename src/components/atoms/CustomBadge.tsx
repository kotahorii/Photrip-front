import { CheckCircleIcon } from '@heroicons/react/solid'
import { useDetailPost } from 'hooks/useDetailPost'
import { useLikes } from 'hooks/useLikes'
import { useRates } from 'hooks/useRate'
import { VFC } from 'react'
import { User } from 'types/userType'

type Props = {
  user?: User
}
export const CustomBadge: VFC<Props> = ({ user }) => {
  const { getAllRate, isLoadingRates } = useRates()
  const { getAllFav, isLoadingFavorites } = useLikes()
  const { isLoadingDetailPost } = useDetailPost()

  const color = () =>
    getAllFav(user)! + getAllRate(user)! >= 1 &&
    getAllFav(user)! + getAllRate(user)! < 5
      ? 'text-red-700 bg-red-100'
      : getAllFav(user)! + getAllRate(user)! >= 5 &&
        getAllFav(user)! + getAllRate(user)! < 10
      ? 'text-gray-400 bg-gray-100'
      : getAllFav(user)! + getAllRate(user)! >= 10
      ? 'text-yellow-400 bg-yellow-100'
      : 'hidden'

  if (isLoadingFavorites || isLoadingRates || isLoadingDetailPost) return null

  return (
    <CheckCircleIcon
      className={`absolute w-5 -bottom-1 -right-1 ${color()} rounded-full`}
    />
  )
}
