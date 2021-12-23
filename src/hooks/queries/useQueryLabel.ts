import Cookies from 'js-cookie'
import client from 'lib/client'
import { useQuery } from 'react-query'
import { Label } from 'types/postType'

const getLabels = async () => {
  const { data } = await client.get<Label[]>('labels', {
    headers: {
      'access-token': Cookies.get('_access_token') as string,
      client: Cookies.get('_client') as string,
      uid: Cookies.get('_uid') as string,
    },
  })
  return data
}
export const useQueryLabels = () => {
  return useQuery<Label[], Error>({
    queryKey: 'labels',
    queryFn: getLabels,
    staleTime: Infinity,
  })
}
