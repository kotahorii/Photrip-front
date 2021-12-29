import { UserCircleIcon } from '@heroicons/react/solid'
import { CustomBadge } from 'components/atoms/CustomBadge'
import { VFC } from 'react'
import { User } from 'types/userType'

type Props = {
  user: User | undefined
}
export const CustomUserIcon: VFC<Props> = ({ user }) => {
  return (
    <>
      <div className="relative">
        {user?.image.url !== null ? (
          <>
            <img
              className="rounded-full object-cover shadow w-14 h-14"
              src={user?.image.url}
              alt="user icon"
            />
            <CustomBadge user={user} />
            <div className="absolute cursor-pointer bg-black w-14 h-14 top-0 rounded-full opacity-0 transition duration-300 hover:opacity-10"></div>
          </>
        ) : (
          <>
            <UserCircleIcon className="rounded-full text-gray-200 w-16 h-16" />
          </>
        )}
      </div>
    </>
  )
}
