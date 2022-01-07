import { useQueryCurrentUser } from 'hooks/queries/useQueryCurrentUser'
import { memo, VFC } from 'react'
import { Navigate } from 'react-router'

type Props = {
  children: JSX.Element
}

export const PublicRoute: VFC<Props> = memo(({ children }) => {
  const { data: currentUser } = useQueryCurrentUser()
  return currentUser?.name ? <Navigate to="/" replace /> : children
})
