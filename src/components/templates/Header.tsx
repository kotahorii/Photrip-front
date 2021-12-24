import { Menu } from '@headlessui/react'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { CustomUserIcon } from 'components/molecules/userIcon/CustomUserIcon'

export const Header = memo(() => {
  const { currentUser } = useMain()
  return (
    <nav className=" flex flex-row z-10 fixed justify-between items-center bg-gray-50 shadow-md px-10 w-screen h-20 text-gray-500 bg-gray-20">
      <Menu.Button>
        <CustomUserIcon user={currentUser} />
      </Menu.Button>
      <div
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }}
        className="text-2xl flex flex-row items-center space-x-2 p-2 transition duration-500 hover:text-blue-500 border-blue-500 cursor-pointer"
      >
        <div className="h-14 w-14">
          <img
            className="h-full w-full"
            src={`${process.env.PUBLIC_URL}/application_icon.png`}
            alt="application-icon"
          />
        </div>
        <p>PhotoGo</p>
      </div>
      <div className="md:flex hidden flex-row space-x-3">
        <Link
          to="/main"
          className="text-lg transition duration-300 hover:bg-gray-100 hover:text-blue-500 rounded-md px-2 py-2"
        >
          投稿一覧
        </Link>
        <Link
          to="/myPage"
          className="text-lg transition duration-300 hover:bg-gray-100 hover:text-blue-500 rounded-md px-2 py-2"
        >
          マイページ
        </Link>
      </div>
      <div className="md:hidden block"></div>
    </nav>
  )
})
