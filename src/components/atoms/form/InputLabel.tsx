import { memo, VFC } from 'react'

type Props = {
  title: string
}

// 入力フォームのラベルコンポーネント
export const InputLabel: VFC<Props> = memo(({ title }) => {
  return <label className="text-gray-500 text-sm text-center">{title}</label>
})
