import Cookies from 'js-cookie'
import client from 'lib/client'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'
import { Post } from 'types/postType'

// Rails APIにGETメソッドでアクセスし、投稿詳細を取得する処理
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

// 取得したレスポンス情報をReact Queryのキャッシュに格納する処理
export const useQueryDetailPost = (id: number | undefined) => {
  const navigate = useNavigate()
  return useQuery<Post, Error>({
    queryKey: 'post',
    queryFn: () => getDetailPost(id),
    staleTime: Infinity,
    onError: () => navigate('/'),
  })
}
