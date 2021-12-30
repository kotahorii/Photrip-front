import { Disclosure, Transition } from '@headlessui/react'
import { memo, ReactNode, VFC } from 'react'

type Props = {
  children: ReactNode
}

export const DisclosurePanel: VFC<Props> = memo(({ children }) => {
  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Disclosure.Panel className=" flex flex-col shadow space-y-2 text-gray-500 break-words bg-white rounded p-3">
        {children}
      </Disclosure.Panel>
    </Transition>
  )
})
