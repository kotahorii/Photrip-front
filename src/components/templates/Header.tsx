import { Menu } from '@headlessui/react'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { CustomUserIcon } from 'components/molecules/userIcon/CustomUserIcon'
import {
  BookOpenIcon as BookOutLineIcon,
  UserIcon as UserOutLineIcon,
} from '@heroicons/react/outline'
import {
  BookOpenIcon as BookSolidIcon,
  UserIcon as UserSolidIcon,
} from '@heroicons/react/solid'

import { useHeader } from 'hooks/useHeader'

export const Header = memo(() => {
  const { currentUser } = useMain()
  const { location, navigate, goToPageTop } = useHeader()
  return (
    <nav className="flex flex-row z-10 font-merriweather fixed justify-between items-center bg-gray-50 shadow-md px-10 w-screen h-20 text-gray-500 bg-gray-20">
      <div
        onClick={goToPageTop}
        className="text-2xl flex flex-row items-center space-x-2 p-2 transition duration-500 hover:text-blue-400 border-blue-500 cursor-pointer"
      >
        <div className="h-14 w-14">
          <img
            className="h-full w-full"
            src={`${process.env.PUBLIC_URL}/application_icon.png`}
            alt="application-icon"
          />
        </div>
        <p className="font-semibold">Photrip</p>
      </div>

      <div className="md:flex font-notoSans font-semibold hidden flex-row">
        <div
          onClick={
            location.pathname === '/main'
              ? goToPageTop
              : () => navigate('/main')
          }
          className={`flex flex-row cursor-pointer space-x-1 items-center text-lg transition duration-300 hover:bg-blue-100 hover:text-blue-500 rounded-md px-2 py-2 ${
            location.pathname === '/main' ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          {location.pathname === '/main' ? (
            <BookSolidIcon className="w-7 h-7" />
          ) : (
            <BookOutLineIcon className="w-6 h-6" />
          )}

          <span>投稿一覧</span>
        </div>
        <div
          onClick={
            location.pathname === '/myPage'
              ? goToPageTop
              : () => navigate('/myPage')
          }
          className={`flex flex-row cursor-pointer space-x-1 items-center text-lg transition duration-300 hover:bg-blue-100 hover:text-blue-500 rounded-md px-2 py-2 ${
            location.pathname === '/myPage' ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          {location.pathname === '/myPage' ? (
            <UserSolidIcon className="w-6 h-6" />
          ) : (
            <UserOutLineIcon className="w-6 h-6" />
          )}
          <span>マイページ</span>
        </div>
      </div>

      <Menu.Button>
        <CustomUserIcon user={currentUser} />
      </Menu.Button>
    </nav>
  )
})
