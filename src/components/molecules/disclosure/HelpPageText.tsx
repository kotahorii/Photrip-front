import { memo, ReactNode, VFC } from 'react'

type Props = {
  title: string
  children: ReactNode
}

// ヘルプページの折りたたみ要素の本文のコンポーネント
export const HelpPageText: VFC<Props> = memo(({ title, children }) => {
  return (
    <p className="text-md font-semibold">
      ・{title}
      <br />
      <span className="text-sm font-medium">{children}</span>
    </p>
  )
})
