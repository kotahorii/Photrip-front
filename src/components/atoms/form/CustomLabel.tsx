import { memo, VFC } from 'react'

type Props = {
  title: string
}

export const CustomLabel: VFC<Props> = memo(({ title }) => {
  return <label className="text-gray-500 text-sm text-center">{title}</label>
})
