import { XCircleIcon } from '@heroicons/react/solid'
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
      className=" flex flex-row justify-between items-center min-w-1/2 truncate overflow-ellipsis mt-2 px-3 py-1 shadow-sm text-blue-800 bg-blue-200 rounded-full"
    >
      <p className="text-center w-full">{label.name}</p>
      {label.userId === currentUser?.id && (
        <XCircleIcon
          onClick={deleteLabel(label)}
          className="cursor-pointer text-blue-500 w-5"
        />
      )}
    </div>
  )
})
