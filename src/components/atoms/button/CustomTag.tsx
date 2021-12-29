import { XIcon } from '@heroicons/react/outline'
import { useMain } from 'hooks/useMain'
import { useSearch } from 'hooks/useSearch'
import { memo, VFC } from 'react'
import { Label } from 'types/postType'

type Props = {
  label: Label
}

export const CustomTag: VFC<Props> = memo(({ label }) => {
  const { deleteLabel } = useSearch()
  const { currentUser } = useMain()
  return (
    <div
      key={label.id}
      className=" flex flex-row justify-between h-8 items-center truncate overflow-ellipsis px-3 py-2 shadow-sm text-white bg-blue-500 rounded"
    >
      <p className="text-center mr-1 w-full">{label.name}</p>
      {label.userId === currentUser?.id && (
        <XIcon
          onClick={deleteLabel(label)}
          className="cursor-pointer text-white w-5"
        />
      )}
    </div>
  )
})
