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
    <div className="flex flex-row justify-between items-center space-x-1 p-2 pl-3 shadow text-white bg-blue-500 rounded">
      <p className="text-center mr-1">{label.name}</p>
      {label.userId === currentUser?.id && (
        <XIcon
          onClick={deleteLabel(label)}
          className="cursor-pointer text-white w-6 h-6 hover:bg-blue-400 p-1 rounded-full"
        />
      )}
    </div>
  )
})
