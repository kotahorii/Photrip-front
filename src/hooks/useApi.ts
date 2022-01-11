import { ChangeEvent, useCallback, useState } from 'react'
import { useQueryAddress } from 'hooks/queries/useQueryAddress'
import { Post } from 'types/postType'
import { useDetailPost } from './useDetailPost'
import { useQueryRakutenData } from './queries/useQueryRakuten'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Geocede from 'react-geocode'
import {
  selectIsOpenHotelModal,
  selectIsOpenRestaurantModal,
  setIsOpenHotelModal,
  setIsOpenRestaurantModal,
  setLatAndLng,
} from 'slices/postSlice'
import { useQueryHotPepper } from 'hooks/queries/useQueryHotPepper'
import { toast } from 'react-toastify'

// Geocoding APIの設定
Geocede.setApiKey(`${process.env.REACT_APP_GOOGLE_MAP_API}`)
Geocede.setLanguage('ja')
Geocede.setRegion('ja')

// 外部APIで使用されている関数をまとめたカスタムフック
export const useApi = () => {
  const [address, setAddress] = useState('')
  const { detailPost } = useDetailPost()
  const dispatch = useAppDispatch()
  const isOpenRestaurantModal = useAppSelector(selectIsOpenRestaurantModal)
  const isOpenHotelModal = useAppSelector(selectIsOpenHotelModal)

  const changeAddress = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }, [])

  // 入力された数字が全角の場合半角に変換する
  const validatedAddress = address
    .replace(/\s+/g, '')
    .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .replace(/[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━]/g, '-')

  const {
    data: addressData,
    isLoading: isLoadingAddress,
    isRefetching: isRefetchingAddress,
    refetch: refetchAddress,
  } = useQueryAddress(validatedAddress)

  // 住所をUTF-8にエンコードする関数
  const hotPepperKeyword = useCallback(
    (post: Post | undefined) =>
      post?.prefecture && post?.city && post?.town
        ? encodeURI(post.prefecture + post.city + post.town.split('町')[0])
        : '',
    []
  )

  const {
    data: hotpepperData,
    refetch: refetchHotPepperData,
    isLoading: isLoadingHotPepperData,
    isRefetching: isRefetchingHotPepperData,
  } = useQueryHotPepper(hotPepperKeyword(detailPost))

  // 住所をUTF-8にエンコードする関数
  const rakutenKeyword = useCallback(
    (post: Post | undefined) =>
      post?.prefecture && post?.city
        ? encodeURI(post.prefecture + post.city)
        : '',
    []
  )
  const {
    data: rakutenData,
    refetch: refetchRakutenData,
    isRefetching: isRefetchingRakuten,
    isLoading: isLoadingRakuten,
    isError,
  } = useQueryRakutenData(rakutenKeyword(detailPost))

  // Geocoding APIのレスポンスをReduxの変数に格納しています
  const geocode = useCallback(() => {
    Geocede.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location
        dispatch(setLatAndLng({ lat: lat, lng: lng }))
        toast.success('住所の取得に成功しました')
      },
      (err) => {
        console.log(err)
        toast.error('有効な郵便番号を入力してください')
      }
    )
  }, [address, dispatch])

  // 郵便番号自動入力ボタンを押したときの処理
  const setAddressData = useCallback(() => {
    refetchAddress()
    geocode()
  }, [refetchAddress, geocode])

  // 入力された郵便番号が有効化をBooleanで返す関数
  const isNotValidData = useCallback(() => {
    const pattern1 = /^[0-9]{3}-[0-9]{4}$/
    const pattern2 = /^[0-9]{7}$/
    return !pattern1.test(validatedAddress) && !pattern2.test(validatedAddress)
  }, [validatedAddress])

  // 店舗情報モーダルを開閉する処理
  const openRestaurantModal = useCallback(() => {
    dispatch(setIsOpenRestaurantModal(true))
    refetchHotPepperData()
  }, [dispatch, refetchHotPepperData])

  const closeRestaurantModal = useCallback(() => {
    dispatch(setIsOpenRestaurantModal(false))
  }, [dispatch])

  const openHotelModal = useCallback(() => {
    dispatch(setIsOpenHotelModal(true))
    refetchRakutenData()
  }, [dispatch, refetchRakutenData])

  const closeHotelModal = useCallback(() => {
    dispatch(setIsOpenHotelModal(false))
  }, [dispatch])

  return {
    isOpenRestaurantModal,
    openRestaurantModal,
    closeRestaurantModal,
    isOpenHotelModal,
    openHotelModal,
    closeHotelModal,
    isNotValidData,
    isError,
    isLoadingAddress,
    isRefetchingAddress,
    hotpepperData,
    isLoadingRakuten,
    isRefetchingRakuten,
    isRefetchingHotPepperData,
    isLoadingHotPepperData,
    validatedAddress,
    address,
    changeAddress,
    rakutenData,
    setAddressData,
    addressData,
    hotPepperKeyword,
  }
}
