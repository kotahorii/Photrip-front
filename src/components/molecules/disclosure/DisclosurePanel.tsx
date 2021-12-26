import { Disclosure, Transition } from '@headlessui/react'

export const DisclosurePanel = () => {
  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Disclosure.Panel className=" flex flex-col shadow-sm space-y-2 text-blue-800 break-words bg-white rounded-sm p-3">
        aaa
      </Disclosure.Panel>
    </Transition>
  )
}
