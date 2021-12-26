import { useCallback, useState } from 'react'

export const useHelp = () => {
  const [isOpenHeaderDisclosure, setIsOpenHeaderDisclosure] = useState(false)
  const [isOpenMainDisclosure, setIsOpenMainDisclosure] = useState(false)
  const [isOpenMyPageDisclosure, setIsOpenMyPageDisclosure] = useState(false)
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
  return {
    isOpenHeaderDisclosure,
    isOpenMainDisclosure,
    isOpenMyPageDisclosure,
    toggleHeaderDisclosure,
    toggleMainDisclosure,
    toggleMyPageDisclosure,
  }
}
