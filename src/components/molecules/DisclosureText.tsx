import { Disclosure, Transition } from '@headlessui/react'
import { UserInfo } from 'components/atoms/UserInfo'
import { useDetailPost } from 'hooks/useDetailPost'
import { useUsers } from 'hooks/useUsers'
import { memo } from 'react'
import { CustomUserIcon } from './userIcon/CustomUserIcon'

export const DisclosureText = memo(() => {
  const { detailPost, postUser, isLoadingDetailPost } = useDetailPost()
  const { isLoadingUsers, users } = useUsers()

  if (isLoadingUsers || isLoadingDetailPost) return null
  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Disclosure.Panel className=" flex flex-col shadow-md space-y-2 text-blue-800 break-words bg-white rounded-sm p-3">
        <div className="flex flex-row space-x-2">
          <UserInfo user={postUser(users)}>
            <CustomUserIcon user={postUser(users)} />
          </UserInfo>
          <div className="h-14 py-2">
            <p>投稿者</p>
            <p className="font-semibold">{postUser(users)?.name}</p>
          </div>
        </div>
        <p>{detailPost?.body}</p>
      </Disclosure.Panel>
    </Transition>
  )
})
