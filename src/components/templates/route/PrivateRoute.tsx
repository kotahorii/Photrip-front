import { Spinner } from 'components/atoms/Spinner'
import { useQueryCurrentUser } from 'hooks/queries/useQueryCurrentUser'
import { memo, VFC } from 'react'
import { Navigate } from 'react-router'

type Props = {
  children: JSX.Element
}

// 認証前のページ用のコンポーネント
export const PrivateRoute: VFC<Props> = memo(({ children }) => {
  const { data, isLoading } = useQueryCurrentUser()
  if (isLoading)
    return (
      <div className="flex flex-col min-h-screen justify-center items-center opacity-40">
        <Spinner />
      </div>
    )
  // ログインしていないときにページに飛ぼうとすると認証ページにリダイレクトされる
  return data?.email ? children : <Navigate to="/auth" replace />
})
