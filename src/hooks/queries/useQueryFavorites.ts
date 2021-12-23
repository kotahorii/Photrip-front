import Cookies from 'js-cookie'
import client from 'lib/client'
import { useQuery } from 'react-query'
import { Favorite } from 'types/postType'

const getFavorites = async () => {
  const { data } = await client.get<Favorite[]>('favorites', {
    headers: {
      'access-token': Cookies.get('_access_token') as string,
      client: Cookies.get('_client') as string,
      uid: Cookies.get('_uid') as string,
    },
  })
  return data
}
export const useQueryFavorites = () => {
  return useQuery<Favorite[], Error>({
    queryKey: 'favorites',
    queryFn: getFavorites,
    staleTime: 600000,
  })
}
