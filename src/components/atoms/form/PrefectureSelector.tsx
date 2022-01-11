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

// 都道府県選択のコンポーネント
export const PrefectureSelector: VFC<Props> = memo(
  ({ value, onChange, arrays }) => {
    return (
      <select
        value={value}
        onChange={onChange}
        className=" p-3 w-full rounded shadow text-gray-500 hover:shadow-md focus:outline-none bg-transparent cursor-pointer"
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
