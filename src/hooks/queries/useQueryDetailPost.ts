import Cookies from 'js-cookie'
import client from 'lib/client'
import { useQuery } from 'react-query'
import { Post } from 'types/postType'

const getDetailPost = async (id: number | undefined) => {
  const { data } = await client.get<Post>(`posts/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token') as string,
      client: Cookies.get('_client') as string,
      uid: Cookies.get('_uid') as string,
    },
  })
  return data
}
export const useQueryDetailPost = (id: number | undefined) => {
  return useQuery<Post, Error>({
    queryKey: 'post',
    queryFn: () => getDetailPost(id),
    staleTime: Infinity,
  })
}
