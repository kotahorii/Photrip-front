import { ModeType } from 'hooks/useMyPage'
import { memo, ReactNode, VFC } from 'react'

type Props = {
  mode: ModeType
  postsMode: ModeType
  onClick: () => void
  children: ReactNode
}

export const SelectModeButton: VFC<Props> = memo(
  ({ mode, postsMode, children, onClick }) => {
    return (
      <button
        className={`transition duration-300 font-notoSans bg-gray-50 shadow hover:shadow-lg relative md:p-3 py-3 px-2 rounded ${
          postsMode === mode && 'font-bold text-blue-500'
        }`}
        onClick={onClick}
      >
        {children}
        {postsMode === mode && (
          <div className="bg-blue-400 absolute left-0 bottom-0 mt-1 rounded-full w-full h-0.5"></div>
        )}
      </button>
    )
  }
)
