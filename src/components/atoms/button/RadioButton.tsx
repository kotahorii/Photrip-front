import { useSearch } from 'hooks/useSearch'
import { memo, VFC } from 'react'

type Props = {
  radioData: {
    name: string
    value: number
    onClick?: () => void
  }[]
}

export const RadioButton: VFC<Props> = memo(({ radioData }) => {
  const { handleOptionChange, selectedOption } = useSearch()
  return (
    <>
      {radioData.map((data) => (
        <label
          key={data.value}
          className="w-32 transition duration-300 hover:bg-gray-200 py-1 pl-2 rounded-lg cursor-pointer"
        >
          <input
            type="radio"
            className="form-radio"
            name="radio"
            value={data.value}
            onClick={data.onClick}
            checked={Number(selectedOption) === data.value}
            onChange={handleOptionChange}
          />
          <span
            className={`ml-2 ${
              Number(selectedOption) === data.value && 'font-bold'
            }`}
          >
            {data.name}
          </span>
        </label>
      ))}
    </>
  )
})
