import { Menu } from '@headlessui/react'
import { SuccessToast } from 'components/molecules/SuccessToast'
import { CustomMenu } from 'components/organisms/menu/CustomMenu'
import { CustomModal } from 'components/organisms/modal/CustomModal'
import { EditUserText } from 'components/organisms/modal/EditUserText'
import { useHeader } from 'hooks/useHeader'
import { VFC, ReactNode, memo, useEffect } from 'react'
import { Header } from './Header'
import { CreateOrEditPost } from 'components/organisms/modal/CreateOrEditPost'
import { DeleteConfirmModal } from 'components/organisms/modal/DeleteConfirmModal'
import { useMain } from 'hooks/useMain'
import { useAppSelector } from 'app/hooks'
import { selectEditedPost } from 'slices/postSlice'

type Props = {
  children: ReactNode
}

// アプリケーションのレイアウトコンポーネント
export const Layout: VFC<Props> = memo(({ children }) => {
  // ページが読み込まれたときにページトップに戻る処理
  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, [])

  const {
    isOpenEditUserModal,
    closeEditedUserModal,
    isOpenCreatePostModal,
    closeCreatePostModal,
  } = useHeader()
  const {
    isOpenDeletePostModal,
    closeDeletePostModal,
    detailUserPost,
    deletePost,
  } = useMain()
  const editedPost = useAppSelector(selectEditedPost)

  return (
    <Menu>
      <div className="flex flex-col relative items-center text-gray-500 text-sm font-mono">
        <Header />
        <main className="flex flex-1 flex-col font-notoSans bg-gray-50 min-h-screen absolute top-20 justify-start items-center py-5 w-screen">
          {children}

          {/* アイコン画像クリック時に表示されるメニューのコンポーネント */}
          <CustomMenu />
        </main>

        {/* ユーザー情報編集用のモーダル */}
        <CustomModal
          title={<>プロフィールを編集</>}
          isOpen={isOpenEditUserModal}
          closeModal={closeEditedUserModal}
        >
          <EditUserText />
        </CustomModal>

        {/* 投稿作成・編集用のモーダル */}
        <CustomModal
          width="w-full"
          mdWidth="md:w-192"
          title={editedPost.id === 0 ? <>新規投稿</> : <>投稿を編集</>}
          isOpen={isOpenCreatePostModal}
          closeModal={closeCreatePostModal}
        >
          <CreateOrEditPost />
        </CustomModal>

        {/* 削除確認用のモーダル */}
        <CustomModal
          isOpen={isOpenDeletePostModal}
          closeModal={closeDeletePostModal}
          title={<>{detailUserPost.title}</>}
          border={false}
        >
          <DeleteConfirmModal onClick={deletePost(detailUserPost.id)} />
        </CustomModal>
        <SuccessToast />
      </div>
    </Menu>
  )
})
