import { ReactNode, VFC } from 'react'

type Props = {
  title: string
  children: ReactNode
}

export const HelpPageText: VFC<Props> = ({ title, children }) => {
  return (
    <p className="text-md font-semibold">
      ・{title}
      <br />
      <span className="text-sm font-medium">{children}</span>
    </p>
  )
}
