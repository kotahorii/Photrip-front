import { memo, VFC } from 'react'

type Props = {
  name: string
  value: string
  placeholder: string
  type?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  isError?: boolean
}

export const CustomInput: VFC<Props> = memo(
  ({
    name,
    value,
    placeholder,
    onChange,
    type = 'text',
    disabled = false,
    isError = false,
  }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`px-3 py-2 w-full disabled:cursor-not-allowed ${
          isError ? 'ring-pink-400' : 'border-gray-50 ring-blue-400'
        } focus:outline-none bg-transparent border rounded shadow appearance-none leading-tight text-gray-600 focus:ring-2`}
        name={name}
        value={value}
        onChange={onChange}
      />
    )
  }
)
