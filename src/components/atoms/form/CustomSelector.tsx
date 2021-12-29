import { ChangeEvent, memo, VFC } from 'react'

type Props = {
  value: number
  onChange: (
    e: ChangeEvent<{
      value: unknown
    }>
  ) => void
  arrays: string[]
}

export const CustomSelector: VFC<Props> = memo(
  ({ value, onChange, arrays }) => {
    return (
      <select
        value={value}
        onChange={onChange}
        className=" p-3 w-full rounded shadow text-gray-500 focus:ring-2 focus:outline-none bg-gray-100 cursor-pointer"
      >
        {arrays.map((array, index) => (
          <option key={index + 1} value={index + 1}>
            {array}
          </option>
        ))}
      </select>
    )
  }
)
