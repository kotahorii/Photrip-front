import { memo, VFC } from 'react'
import { RefreshIcon } from '@heroicons/react/outline'

type Props = {
  onClick?: () => void
  hoverColor?: string
  text: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
}

export const InputButton: VFC<Props> = memo(
  ({ onClick, text, type = 'button', disabled, loading = false }) => {
    return (
      <button
        type={type}
        disabled={disabled}
        className=" bg-blue-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow hover:bg-blue-600 inline-flex w-full max-w-xs justify-center px-3 py-2 text-sm font-medium rounded text-white focus:outline-none"
        onClick={onClick}
      >
        {loading ? <RefreshIcon className="animate-spin w-5" /> : text}
      </button>
    )
  }
)
