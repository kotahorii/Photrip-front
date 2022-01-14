import { ModeType } from 'hooks/useMyPage'
import { memo, ReactNode, VFC } from 'react'

type Props = {
  mode: ModeType
  postsMode: ModeType
  onClick: () => void
  children: ReactNode
}

// マイページでどの投稿を表示するか選ぶタブのコンポーネント
export const SelectModeButton: VFC<Props> = memo(
  ({ mode, postsMode, children, onClick }) => {
    return (
      <button
        className={`transition duration-300 font-notoSans bg-gray-50 shadow hover:shadow-lg relative py-4 md:px-4 px-2 rounded ${
          // 選択されているとき文字の色と太さが変化する
          postsMode === mode && 'font-bold text-blue-500'
        }`}
        onClick={onClick}
      >
        {children}
        {postsMode === mode && (
          // 選択されているときボタンの下部に線が表示される
          <div className="bg-blue-400 absolute left-0 bottom-0 mt-1 rounded-full w-full h-1"></div>
        )}
      </button>
    )
  }
)
