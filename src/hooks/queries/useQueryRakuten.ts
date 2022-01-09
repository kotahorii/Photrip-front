import axios from 'axios'
import { useQuery } from 'react-query'
import { RakutenQueryType, RakutenRes } from 'types/apiTypes'

// 楽天トラベルAPIにGETメソッドでアクセスし、ホテル情報を取得する処理
const getRakutenData = async (key: string) => {
  const { data } = await axios.get<RakutenRes>(
    `${process.env.REACT_APP_RAKUTEN_URL}` + key
  )
  return data.hotels
}

// レスポンスで帰ってきた情報をReact Queryのキャッシュに格納する処理
export const useQueryRakutenData = (key: string) => {
  return useQuery<RakutenQueryType, Error>({
    queryKey: 'rakuten',
    queryFn: () => getRakutenData(key),
    staleTime: Infinity,
    enabled: false,
  })
}
