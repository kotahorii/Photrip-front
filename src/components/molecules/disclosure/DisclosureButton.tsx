import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { ReactNode, VFC } from 'react'

type Props = {
  isOpen: boolean
  toggleOpen: () => void
  children: ReactNode
}

export const DisclosureButton: VFC<Props> = ({
  isOpen,
  toggleOpen,
  children,
}) => {
  return (
    <Disclosure.Button className=" text-blue-600 bg-blue-100 hover:bg-blue-200 w-full rounded border-blue-400 border-2 shadow">
      <div
        onClick={toggleOpen}
        className="flex flex-row justify-center items-center space-x-2 py-2"
      >
        <span>{children}</span>
        <ChevronDownIcon
          className={`${
            isOpen ? '' : 'transform rotate-180'
          } w-5 h-5 text-purple-500`}
        />
      </div>
    </Disclosure.Button>
  )
}
