import { VFC } from 'react'

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
  isError?: boolean
}
export const TextArea: VFC<Props> = ({
  value,
  onChange,
  placeholder,
  isError,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={`focus:outline-none w-full shadow bg-transparent focus:ring-2 ${
        isError ? 'ring-pink-400' : 'ring-blue-400'
      } rounded-md resize-none px-2 py-1`}
      placeholder={placeholder}
    ></textarea>
  )
}
