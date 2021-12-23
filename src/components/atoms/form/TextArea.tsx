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
      className={`focus:outline-none w-full bg-transparent border focus:border-2 ${
        isError ? 'border-pink-500' : 'border-indigo-500'
      } placeholder-indigo-400 rounded-md resize-none px-2 py-1`}
      placeholder={placeholder}
    ></textarea>
  )
}
