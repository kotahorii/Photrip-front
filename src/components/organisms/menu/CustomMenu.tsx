import { Menu, Transition } from '@headlessui/react'
import { Fragment, memo } from 'react'
import { LogoutIcon } from '@heroicons/react/outline'
import { useAuth } from 'hooks/useAuth'
import { useHeader } from 'hooks/useHeader'

export const CustomMenu = memo(() => {
  const { signOut } = useAuth()
  const { menuItems, responsiveItems } = useHeader()
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="fixed left-3 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="p-1">
          {menuItems.map((item) => (
            <Menu.Item key={item.name}>
              <button
                onClick={item.onClick}
                className="text-gray-500 transition duration-300 hover:bg-gray-100 group flex rounded-md items-center w-full px-2 py-2 text-sm"
              >
                <item.icon className="w-6 mr-2" />
                {item.name}
              </button>
            </Menu.Item>
          ))}
        </div>
        <div className="p-1 md:hidden block">
          {responsiveItems.map((item) => (
            <Menu.Item key={item.name}>
              <button
                onClick={item.onClick}
                className="text-gray-500 transition duration-300 hover:bg-gray-100 group flex rounded-md items-center w-full px-2 py-2 text-sm"
              >
                <item.icon className="w-6 mr-2" />
                {item.name}
              </button>
            </Menu.Item>
          ))}
        </div>
        <div className="p-1">
          <Menu.Item>
            <button
              onClick={signOut}
              className="text-gray-500 transition duration-300 hover:bg-gray-100 group flex rounded-md items-center w-full px-2 py-2 text-sm"
            >
              <LogoutIcon className="w-6 mr-2" />
              ログアウト
            </button>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  )
})
