import { useAuth } from 'hooks/useAuth'
import {
  InformationCircleIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/outline'
import { SuccessToast } from 'components/molecules/SuccessToast'
import { LoginForm } from 'components/organisms/auth/LoginForm'
import { SignUpForm } from 'components/organisms/auth/SignUpForm'
import { CustomButton } from 'components/atoms/button/CustomButton'
import { memo } from 'react'
import { Link } from 'react-router-dom'

export const Auth = memo(() => {
  const {
    isLogin,
    toggleIsLogin,
    authUser,
    isValidAuth,
    isLoadingAuth,
    guestUserLogin,
    isLoadingGuestUser,
    userData,
  } = useAuth()
  return (
    <div className="h-screen flex font-notoSans">
      <div className="relative md:flex hidden md:w-1/2 w-screen justify-around items-center">
        <div className="z-20 flex flex-col items-center">
          <div className="flex flex-row items-center">
            <div className="h-12 w-12">
              <img
                className="h-full w-full"
                src={`${process.env.PUBLIC_URL}/application_icon.png`}
                alt="application-icon"
              />
            </div>
            <h1 className="text-white font-merriweather font-bold text-4xl font-sans">
              Photrip
            </h1>
          </div>
          <p className="text-white mt-2 text-center text-lg">
            最高の体験をここで共有しませんか？
          </p>
        </div>
        <div className="h-full w-full bg-black opacity-20 z-10 absolute"></div>
        <img
          className="h-full w-full object-cover absolute"
          alt="auth_page_photo"
          src={`${process.env.PUBLIC_URL}/portfolio_image.jpeg`}
        />
      </div>

      <div className="flex flex-col md:w-1/2 w-screen justify-center items-center bg-gray-100  min-h-screen">
        <form
          onSubmit={authUser}
          className="flex flex-col space-y-3 w-96 px-7 py-5 items-center text-gray-600"
        >
          {isLogin ? <LoginForm /> : <SignUpForm />}
          <div className="flex flex-row space-x-5 justify-center items-center w-full">
            <CustomButton
              disabled={isValidAuth}
              type="submit"
              text={isLogin ? 'ログイン' : '新規登録'}
              loading={isLoadingAuth()}
            />
          </div>
          {isLogin && (
            <div className="flex flex-row space-x-5 justify-center items-center w-full">
              <CustomButton
                disabled={
                  userData.email.length > 0 || userData.password.length > 0
                }
                onClick={guestUserLogin}
                text="ゲストユーザーでログイン"
                loading={isLoadingGuestUser()}
              />
            </div>
          )}
          <div
            onClick={toggleIsLogin}
            className="flex flex-row space-x-3 w-full text-blue-500 hover:text-blue-600 cursor-pointer"
          >
            <SwitchVerticalIcon className="w-6 h-6 " />
            <p>{isLogin ? '新規登録はこちら' : 'ログインはこちら'}</p>
          </div>
          <div className="flex flex-row space-x-2 justify-center items-center w-full cursor-pointer text-blue-500 hover:text-blue-600">
            <InformationCircleIcon className="w-8 h-8" />
            <Link to="/help" className=" w-full">
              使い方を確認する
            </Link>
          </div>
        </form>
        <SuccessToast />
      </div>
    </div>
  )
})
