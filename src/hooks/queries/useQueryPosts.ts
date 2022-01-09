import Cookies from 'js-cookie'
import client from 'lib/client'
import { useQuery } from 'react-query'
import { Post } from 'types/postType'

// Rails APIにGETメソッドでアクセスし、投稿一覧を取得する処理
const getAllPosts = async () => {
  const { data } = await client.get<Post[]>('posts', {
    headers: {
      'access-token': Cookies.get('_access_token') as string,
      client: Cookies.get('_client') as string,
      uid: Cookies.get('_uid') as string,
    },
  })
  return data
}

// レスポンスで帰ってきた情報をReact Queryのキャッシュに格納する処理
export const useQueryPosts = () => {
  return useQuery<Post[], Error>({
    queryKey: 'posts',
    queryFn: getAllPosts,
    staleTime: 600000,
  })
}
