import { Menu } from '@headlessui/react'
import {
  BookOpenIcon as BookOutLineIcon,
  UserIcon as UserOutLineIcon,
} from '@heroicons/react/outline'
import {
  BookOpenIcon as BookSolidIcon,
  UserIcon as UserSolidIcon,
} from '@heroicons/react/solid'
import { UserProfileIcon } from 'components/molecules/userIcon/UserProfileIcon'
import { useHeader } from 'hooks/useHeader'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'

// ヘッダーのコンポーネント
export const Header = memo(() => {
  const { currentUser } = useMain()
  const { location, navigate, goToPageTop } = useHeader()
  return (
    <nav className="flex flex-row z-10 font-merriweather fixed justify-between items-center bg-gray-50 shadow px-10 w-screen h-20 text-gray-500 bg-gray-20">
      <div
        onClick={goToPageTop}
        className="text-2xl flex flex-row items-center p-2 transition duration-500 hover:text-blue-300 cursor-pointer"
      >
        <div className=" h-10 w-10">
          <img
            className="h-full w-full"
            src={`${process.env.PUBLIC_URL}/application_icon.png`}
            alt="application-icon"
          />
        </div>
        <p className="font-semibold ">Photrip</p>
      </div>

      <div className="md:flex font-notoSans font-semibold hidden flex-row">
        {/* 現在のページが一覧ページならページトップに戻り、その他のページなら一覧ページに遷移する */}
        <div
          onClick={
            location.pathname === '/' ? goToPageTop : () => navigate('/')
          }
          className={`flex flex-row cursor-pointer space-x-1 items-center text-lg transition duration-300 hover:bg-blue-100 hover:text-blue-500 rounded px-2 py-2 ${
            location.pathname === '/' ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          {/* 現在のページが一覧ページの場合アイコンが変化する */}
          {location.pathname === '/' ? (
            <BookSolidIcon className="w-6 h-6 mt-1" />
          ) : (
            <BookOutLineIcon className="w-6 h-6 mt-1" />
          )}
          <span>投稿一覧</span>
        </div>

        {/* 現在のページがマイページならページトップに戻り、その他のページならマイページに遷移する */}
        <div
          onClick={
            location.pathname === '/myPage'
              ? goToPageTop
              : () => navigate('/myPage')
          }
          className={`flex flex-row cursor-pointer space-x-1 items-center text-lg transition duration-300 hover:bg-blue-100 hover:text-blue-500 rounded px-2 py-2 ${
            location.pathname === '/myPage' ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          {/* 現在のページがマイページの場合アイコンが変化する */}
          {location.pathname === '/myPage' ? (
            <UserSolidIcon className="w-6 h-6" />
          ) : (
            <UserOutLineIcon className="w-6 h-6" />
          )}
          <span>マイページ</span>
        </div>
      </div>

      <Menu.Button>
        <UserProfileIcon user={currentUser} />
      </Menu.Button>
    </nav>
  )
})
