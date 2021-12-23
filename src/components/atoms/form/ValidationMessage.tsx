import { ReactNode, VFC } from 'react'

type Props = {
  isError: boolean
  children: ReactNode
}

export const ValidationMessage: VFC<Props> = ({ isError, children }) => {
  return <>{isError && <p className="text-xs text-pink-500">{children}</p>}</>
}
