import { useCallback, useState } from 'react'

// ヘルプページで使用されている関数をまとめたカスタムフック
export const useHelp = () => {
  const [isOpenHeaderDisclosure, setIsOpenHeaderDisclosure] = useState(false)
  const [isOpenMainDisclosure, setIsOpenMainDisclosure] = useState(false)
  const [isOpenMyPageDisclosure, setIsOpenMyPageDisclosure] = useState(false)
  const [isOpenModalDisclosure, setIsOpenModalDisclosure] = useState(false)
  const [isOpenDetailDisclosure, setIsOpenDetailDisclosure] = useState(false)

  // ヘルプページの折りたたみ要素を開閉する処理
  const toggleHeaderDisclosure = useCallback(
    () => setIsOpenHeaderDisclosure(!isOpenHeaderDisclosure),
    [isOpenHeaderDisclosure]
  )
  const toggleMainDisclosure = useCallback(
    () => setIsOpenMainDisclosure(!isOpenMainDisclosure),
    [isOpenMainDisclosure]
  )
  const toggleMyPageDisclosure = useCallback(
    () => setIsOpenMyPageDisclosure(!isOpenMyPageDisclosure),
    [isOpenMyPageDisclosure]
  )
  const toggleModalDisclosure = useCallback(
    () => setIsOpenModalDisclosure(!isOpenModalDisclosure),
    [isOpenModalDisclosure]
  )
  const toggleDetailDisclosure = useCallback(
    () => setIsOpenDetailDisclosure(!isOpenDetailDisclosure),
    [isOpenDetailDisclosure]
  )
  return {
    isOpenHeaderDisclosure,
    isOpenMainDisclosure,
    isOpenMyPageDisclosure,
    isOpenModalDisclosure,
    isOpenDetailDisclosure,
    toggleHeaderDisclosure,
    toggleMainDisclosure,
    toggleMyPageDisclosure,
    toggleModalDisclosure,
    toggleDetailDisclosure,
  }
}
