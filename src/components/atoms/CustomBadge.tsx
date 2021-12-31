import { CheckCircleIcon } from '@heroicons/react/solid'
import { useDetailPost } from 'hooks/useDetailPost'
import { useLikes } from 'hooks/useLikes'
import { useRates } from 'hooks/useRate'
import { memo, VFC } from 'react'
import { User } from 'types/userType'

type Props = {
  user?: User
}
export const CustomBadge: VFC<Props> = memo(({ user }) => {
  const { getAllRate } = useRates()
  const { getAllFav } = useLikes()
  const { isLoadingDetailPost } = useDetailPost()

  const color = () =>
    getAllFav(user)! + getAllRate(user)! >= 10 &&
    getAllFav(user)! + getAllRate(user)! < 30
      ? 'text-red-600 bg-red-100'
      : getAllFav(user)! + getAllRate(user)! >= 30 &&
        getAllFav(user)! + getAllRate(user)! < 50
      ? 'text-gray-300 bg-gray-100'
      : getAllFav(user)! + getAllRate(user)! >= 50
      ? 'text-yellow-400 bg-yellow-100'
      : 'hidden'

  if (isLoadingDetailPost) return null

  return (
    <CheckCircleIcon
      className={`absolute w-5 -bottom-1 -right-1 ${color()} rounded-full`}
    />
  )
})
