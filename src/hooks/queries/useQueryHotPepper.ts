import axios from 'axios'
import { useQuery } from 'react-query'
import { HotPepperQueryType, HotPepperRes } from 'types/apiTypes'

// Rails APIにGETメソッドでアクセスし、店舗情報を取得する処理
const getHotPepperData = async (key: string) => {
  const { data } = await axios.get<HotPepperRes>(
    `${process.env.REACT_APP_HOTPEPPER_URL}?key=${key}`
  )
  return data.results.shop
}

// レスポンスで帰ってきた情報をReact Queryのキャッシュに格納する処理
export const useQueryHotPepper = (key: string) => {
  return useQuery<HotPepperQueryType, Error>({
    queryKey: 'hotPepper',
    queryFn: () => getHotPepperData(key),
    staleTime: Infinity,
    enabled: false,
  })
}
