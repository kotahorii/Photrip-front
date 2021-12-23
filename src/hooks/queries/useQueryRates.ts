import Cookies from 'js-cookie'
import client from 'lib/client'
import { useQuery } from 'react-query'
import { Rate } from 'types/postType'

const getRates = async () => {
  const { data } = await client.get<Rate[]>('rates', {
    headers: {
      'access-token': Cookies.get('_access_token') as string,
      client: Cookies.get('_client') as string,
      uid: Cookies.get('_uid') as string,
    },
  })
  return data
}
export const useQueryRates = () => {
  return useQuery<Rate[], Error>({
    queryKey: 'rates',
    queryFn: getRates,
    staleTime: 600000,
  })
}
