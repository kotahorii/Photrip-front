import { StarIcon } from '@heroicons/react/solid'
import { CustomButton } from 'components/atoms/button/CustomButton'
import { LikeButton } from 'components/atoms/button/LikeButton'
import { ShopSearchButton } from 'components/atoms/button/ShopSearchButton'
import { CustomInput } from 'components/atoms/form/CustomInput'
import { CommentCard } from 'components/organisms/card/CommentCard'
import { ModalTemplate } from 'components/organisms/modal/ModalTemplate'
import { Layout } from 'components/templates/Layout'
import { useApi } from 'hooks/useApi'
import { useDetailPost } from 'hooks/useDetailPost'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'
import { ShopModal } from 'components/molecules/modal/ShopModal'
import { HotelModal } from 'components/molecules/modal/HotelModal'
import { RateInput } from 'components/molecules/rate/RateInput'
import { useRates } from 'hooks/useRate'
import { Disclosure } from '@headlessui/react'
import { PostDetailDisclosure } from 'components/molecules/disclosure/PostDetailDisclosure'
import { useSearch } from 'hooks/useSearch'
import { CustomTag } from 'components/atoms/label/CustomTag'
import { PaperAirplaneIcon } from '@heroicons/react/solid'
import { ImageModal } from 'components/organisms/modal/ImageModal'
import { ValidationMessage } from 'components/atoms/form/ValidationMessage'
import { TextArea } from 'components/atoms/form/TextArea'
import { DisclosureButton } from 'components/molecules/disclosure/DisclosureButton'
import { InputButton } from 'components/atoms/button/InputButton'
import { HotelOrRestrauntTitle } from 'components/molecules/modal/HotelOrRestrauntTitle'
import { DeleteConfirmModal } from 'components/molecules/modal/DeleteConfirmModal'
// import { GoogleMapComponent } from 'components/organisms/map/GoogleMapComponent'

export const DetailPost = memo(() => {
  const { isLoadingUser, currentUser } = useMain()
  const { hotpepperData, rakutenData } = useApi()
  const {
    commentChange,
    comment,
    detailPost,
    isLoadingDetailPost,
    isRefechingDetailPost,
    submitComment,
    openDisclosure,
    toggleOpenDisclosure,
    isOpenImageModal,
    openImageModal,
    closeImageModal,
    openEditPostModal,
    isOpenDeleteCommentModal,
    closeDeleteCommentModal,
    deleteComment,
  } = useDetailPost()
  const {
    isOpenShopModal,
    closeShopModal,
    openShopModal,
    isOpenHotelModal,
    openHotelModal,
    closeHotelModal,
  } = useApi()

  const { averageRate } = useRates()
  const { labelName, changeLabel, createLabel, labelPostLoading } = useSearch()

  if (isLoadingDetailPost || isLoadingUser || isRefechingDetailPost)
    return (
      <Layout>
        <></>
      </Layout>
    )
  return (
    <Layout>
      <Disclosure>
        <div className="flex flex-col space-y-5 items-center w-full min-h-screen">
          <h1 className="w-full text-3xl text-center font-semibold">
            {detailPost?.title}
          </h1>
          <div className="flex md:flex-row flex-col justify-center items-center md:items-start md:space-x-3 md:space-y-0 space-y-3 md:w-full w-11/12">
            <div className="flex flex-col justify-between items-center space-y-4 ">
              {detailPost?.image.url === null ? (
                <div className="w-96 h-64 relative rounded bg-gray-200">
                  <p className=" absolute text-xl font-semibold text-gray-400 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    No image
                  </p>
                </div>
              ) : (
                <div
                  onClick={openImageModal}
                  className=" relative md:w-96 md:h-64 w-80 h-60"
                >
                  <div className="absolute w-full h-full rounded cursor-pointer transition duration-300 bg-black opacity-0 hover:opacity-20"></div>
                  <img
                    className="rounded object-cover shadow w-full h-full"
                    alt="post detail"
                    src={detailPost?.image.url}
                  />
                </div>
              )}
              <div className="flex flex-row md:w-full w-11/12 justify-center items-center">
                <div className="h-7 w-12 flex flex-row items-center rounded">
                  {detailPost?.city !== '' && <LikeButton post={detailPost!} />}
                  <span>{detailPost?.favorites.length}</span>
                </div>
                <div className=" flex flex-row items-center space-x-1 h-7 w-24 rounded">
                  <StarIcon className="w-6 text-yellow-500" />
                  <p className="flex flex-row">
                    {averageRate(detailPost)?.toString() !== 'NaN'
                      ? averageRate(detailPost)?.toString()
                      : 0}
                    <span className="text-gray-400 ml-0.5">
                      ({detailPost?.rates.length}件)
                    </span>
                  </p>
                </div>
                <div className="flex flex-row truncate overflow-ellipsis h-7 w-56 rounded items-center">
                  {`${detailPost?.prefecture} ${detailPost?.city} ${detailPost?.town}`}
                </div>
              </div>
              <ShopSearchButton
                title="周辺のレストランを検索"
                onClick={openShopModal}
              />
              <ShopSearchButton
                title="周辺のホテルを検索"
                onClick={openHotelModal}
              />
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row">
                  {detailPost?.userId === currentUser?.id && (
                    <>
                      <div className=" w-68 md:pl-0 pl-4">
                        <CustomInput
                          name="label"
                          value={labelName}
                          placeholder="タグ"
                          onChange={changeLabel}
                          isError={labelName.length > 15}
                        />
                      </div>
                      <div className="w-28 md:pr-0 pr-4">
                        <InputButton
                          text="タグ追加"
                          onClick={createLabel}
                          disabled={
                            labelName.length > 15 || labelName.length === 0
                          }
                          loading={labelPostLoading()}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="md:px-0 px-4">
                  <ValidationMessage isError={labelName.length > 15}>
                    15文字以内で入力してください
                  </ValidationMessage>
                </div>
              </div>
              <div className="flex flex-row w-96 md:px-0 px-4 overflow-x-auto whitespace-nowrap space-x-2">
                {detailPost?.labels.map((label) => (
                  <CustomTag key={label.id} label={label} />
                ))}
              </div>
            </div>
            <form
              onSubmit={submitComment}
              className=" w-96 flex flex-col space-y-2 md:px-0 px-4 rounded"
            >
              <div className="w-full md:h-104 h-80 p-2 space-y-3 bg-blue-50 overflow-auto rounded shadow">
                {detailPost?.comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
              <TextArea
                value={comment}
                placeholder="コメント"
                onChange={commentChange}
                isError={comment.length > 140}
              />
              <ValidationMessage isError={comment.length > 140}>
                140文字以内で入力してください
              </ValidationMessage>
              <div className="w-full flex flex-row items-center space-x-2 h-10">
                <div className="flex items-center justify-center w-44">
                  {detailPost?.userId === currentUser?.id && (
                    <CustomButton
                      text="投稿を編集"
                      onClick={openEditPostModal}
                    />
                  )}
                </div>
                <RateInput />
                <p>{comment.length}/140</p>
                <div className="w-8">
                  <button
                    type="submit"
                    disabled={comment.length === 0 || comment.length > 140}
                  >
                    <PaperAirplaneIcon
                      className={`transform rotate-90 transition duration-300 ${
                        comment.length === 0 || comment.length > 140
                          ? 'opacity-30 cursor-not-allowed'
                          : 'opacity-100 hover:text-gray-500'
                      } w-6 text-gray-400 cursor-pointer`}
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="md:w-1/2 w-full md:px-0 px-4">
            <DisclosureButton
              isOpen={openDisclosure}
              toggleOpen={toggleOpenDisclosure}
            >
              詳細を見る
            </DisclosureButton>
          </div>
          <div className="md:w-1/2 w-full md:px-0 px-4">
            <PostDetailDisclosure />
          </div>
          {/* <GoogleMapComponent post={detailPost} /> */}
          <div className="h-96 w-full bg-blue-200 "></div>
        </div>
        <ModalTemplate
          width="w-full"
          mdWidth="md:w-192"
          title={
            <HotelOrRestrauntTitle
              title="レストラン"
              length={hotpepperData?.length}
            />
          }
          isOpen={isOpenShopModal}
          closeModal={closeShopModal}
        >
          <ShopModal />
        </ModalTemplate>
        <ModalTemplate
          width="w-full"
          mdWidth="md:w-192"
          title={
            <HotelOrRestrauntTitle
              title="ホテル"
              length={rakutenData?.length}
            />
          }
          isOpen={isOpenHotelModal}
          closeModal={closeHotelModal}
        >
          <HotelModal />
        </ModalTemplate>
        <ModalTemplate
          isOpen={isOpenDeleteCommentModal}
          closeModal={closeDeleteCommentModal}
          title={<>コメントを削除</>}
          border={false}
        >
          <DeleteConfirmModal onClick={deleteComment} />
        </ModalTemplate>
        <ImageModal
          isOpen={isOpenImageModal}
          closeModal={closeImageModal}
          post={detailPost}
        />
      </Disclosure>
    </Layout>
  )
})
