import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { memo, ReactNode, VFC } from 'react'

type Props = {
  isOpen: boolean
  toggleOpen: () => void
  children: ReactNode
}

export const DisclosureButton: VFC<Props> = memo(
  ({ isOpen, toggleOpen, children }) => {
    return (
      <Disclosure.Button className=" text-white bg-blue-500 transition duration-300 hover:bg-blue-600 w-full rounded shadow">
        <div
          onClick={toggleOpen}
          className="flex flex-row justify-center items-center space-x-2 py-2"
        >
          <span>{children}</span>
          <ChevronDownIcon
            className={`${
              isOpen ? '' : 'transform rotate-180'
            } w-5 h-5 text-white`}
          />
        </div>
      </Disclosure.Button>
    )
  }
)
