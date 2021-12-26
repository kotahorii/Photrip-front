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
      className={`focus:outline-none w-full bg-transparent border-2 focus:border-3 ${
        isError
          ? 'border-pink-500 focus:bg-pink-50'
          : 'border-blue-500 focus:bg-blue-50'
      } placeholder-blue-400 rounded-md resize-none px-2 py-1`}
      placeholder={placeholder}
    ></textarea>
  )
}
