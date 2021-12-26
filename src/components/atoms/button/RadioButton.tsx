import { useSearch } from 'hooks/useSearch'
import { memo, VFC } from 'react'

type Props = {
  data: {
    name: string
    value: number
    onClick?: () => void
  }
}

export const RadioButton: VFC<Props> = memo(({ data }) => {
  const { handleOptionChange, selectedOption } = useSearch()
  return (
    <>
      <label
        key={data.value}
        className={`flex items-center justify-center p-3 border-2 md:mr-0 mr-1 ${
          Number(selectedOption) === data.value &&
          'font-bold text-white bg-blue-400'
        } border-blue-400 items-center hover:bg-blue-400 hover:text-white transition duration-300 rounded-lg cursor-pointer`}
      >
        <input
          hidden
          type="radio"
          className="form-radio"
          name="radio"
          value={data.value}
          onClick={data.onClick}
          checked={Number(selectedOption) === data.value}
          onChange={handleOptionChange}
        />
        <span>{data.name}</span>
      </label>
    </>
  )
})
