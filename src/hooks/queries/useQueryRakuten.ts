import axios from 'axios'
import { useQuery } from 'react-query'
import { RakutenQueryType, RakutenRes } from 'types/apiTypes'

const getRakutenData = async (key: string) => {
  const { data } = await axios.get<RakutenRes>(
    `${process.env.REACT_APP_RAKUTEN_URL}` + key
  )
  return data.hotels
}
export const useQueryRakutenData = (key: string) => {
  return useQuery<RakutenQueryType, Error>({
    queryKey: 'rakuten',
    queryFn: () => getRakutenData(key),
    staleTime: Infinity,
    enabled: false,
  })
}
