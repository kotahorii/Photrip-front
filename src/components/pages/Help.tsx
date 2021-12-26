import { Disclosure } from '@headlessui/react'
import { DisclosureButton } from 'components/molecules/disclosure/DisclosureButton'
import { DisclosurePanel } from 'components/molecules/disclosure/DisclosurePanel'
import { useHelp } from 'hooks/useHelp'

export const Help = () => {
  const {
    isOpenHeaderDisclosure,
    isOpenMainDisclosure,
    isOpenMyPageDisclosure,
    toggleHeaderDisclosure,
    toggleMainDisclosure,
    toggleMyPageDisclosure,
  } = useHelp()
  return (
    <div className="w-full min-h-screen font-notoSans flex flex-col text-gray-500 items-center bg-gray-50">
      <div className=" max-w-lg w-full min-h-screen p-1">
        <h1 className="flex flex-row items-center justify-center text-3xl w-full p-8 font-semibold">
          <div className="h-14 w-14">
            <img
              className="h-full w-full"
              src={`${process.env.PUBLIC_URL}/application_icon.png`}
              alt="application-icon"
            />
          </div>
          <span className="font-merriweather">Photrip</span>
        </h1>
        <p className="text-xl">
          <span className="font-merriweather">Photrip</span>
          は旅行の体験を共有したいユーザーと、旅行に行きたいと思うユーザーを繋ぐためのサービスです。
        </p>
        <div className=" flex flex-col space-y-2 p-2 w-full mt-10 bg-gray-100 rounded-md">
          <Disclosure>
            <DisclosureButton
              isOpen={isOpenHeaderDisclosure}
              toggleOpen={toggleHeaderDisclosure}
            >
              ヘッダーの使い方
            </DisclosureButton>
            <DisclosurePanel />
          </Disclosure>
          <Disclosure>
            <DisclosureButton
              isOpen={isOpenMainDisclosure}
              toggleOpen={toggleMainDisclosure}
            >
              メインページの使い方
            </DisclosureButton>
            <DisclosurePanel />
          </Disclosure>
          <Disclosure>
            <DisclosureButton
              isOpen={isOpenMyPageDisclosure}
              toggleOpen={toggleMyPageDisclosure}
            >
              マイページの使い方
            </DisclosureButton>
            <DisclosurePanel />
          </Disclosure>
        </div>
      </div>
    </div>
  )
}
