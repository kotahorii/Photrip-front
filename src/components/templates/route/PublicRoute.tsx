import { useQueryCurrentUser } from 'hooks/queries/useQueryCurrentUser'
import { memo, VFC } from 'react'
import { Navigate } from 'react-router'

type Props = {
  children: JSX.Element
}

// 認証後のページ用のコンポーネント
export const PublicRoute: VFC<Props> = memo(({ children }) => {
  const { data: currentUser } = useQueryCurrentUser()
  // ログインしているときにページに飛ぼうとすると一覧ページにリダイレクトされる
  return currentUser?.name ? <Navigate to="/" replace /> : children
})
