import { StarIcon } from '@heroicons/react/solid'
import { CustomButton } from 'components/atoms/button/CustomButton'
import { LikeButton } from 'components/atoms/button/LikeButton'
import { ShopSearchButton } from 'components/atoms/button/ShopSearchButton'
import { CustomInput } from 'components/atoms/form/CustomInput'
import { CommentCard } from 'components/organisms/card/CommentCard'
import { CustomModal } from 'components/organisms/modal/CustomModal'
import { Layout } from 'components/templates/Layout'
import { useApi } from 'hooks/useApi'
import { useDetailPost } from 'hooks/useDetailPost'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'
import { ShopModal } from 'components/organisms/modal/ShopModal'
import { HotelModal } from 'components/organisms/modal/HotelModal'
import { CustomRateInput } from 'components/molecules/rate/CustomRateInput'
import { useRates } from 'hooks/useRate'
import { Disclosure } from '@headlessui/react'
import { DisclosureText } from 'components/molecules/DisclosureText'
import { useSearch } from 'hooks/useSearch'
import { CustomTag } from 'components/atoms/button/CustomTag'
import { PaperAirplaneIcon } from '@heroicons/react/solid'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { ImageModal } from 'components/organisms/modal/ImageModal'
import { ValidationMessage } from 'components/atoms/form/ValidationMessage'
import { TextArea } from 'components/atoms/form/TextArea'
// import { GoogleMapComponent } from 'components/organisms/map/GoogleMapComponent'

export const DetailPost = memo(() => {
  const { isLoadingUser, currentUser } = useMain()
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
        <div className="flex flex-col space-y-2 items-center px-2 w-full min-h-screen">
          <p className="w-full text-3xl text-center font-semibold">
            {detailPost?.title}
          </p>
          <div className="flex md:flex-row flex-col justify-center items-center md:space-x-3 md:space-y-0 space-y-3 md:w-full w-11/12">
            <div className="flex flex-col justify-between items-center space-y-4 ">
              {detailPost?.image.url === null ? (
                <div className="w-96 h-64 relative rounded-md bg-gray-200">
                  <p className=" absolute text-xl font-semibold text-gray-400 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    No image
                  </p>
                </div>
              ) : (
                <div
                  onClick={openImageModal}
                  className=" relative md:w-96 md:h-64 w-80 h-60"
                >
                  <div className="absolute w-full h-full rounded-md cursor-pointer transition duration-300 bg-black opacity-0 hover:opacity-20"></div>
                  <img
                    className="rounded-md object-cover w-full h-full"
                    alt="post detail"
                    src={detailPost?.image.url}
                  />
                </div>
              )}
              <div className="flex flex-row w-full justify-center items-center">
                <div className="h-7 w-12 flex flex-row items-center rounded-lg">
                  {detailPost?.city !== '' && <LikeButton post={detailPost!} />}
                  <span>{detailPost?.favorites.length}</span>
                </div>
                <div className=" flex flex-row items-center space-x-1 h-7 w-24 rounded-lg">
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
                <div className="flex flex-row truncate overflow-ellipsis h-7 w-56 rounded-lg items-center">
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
              <div className="flex flex-row space-x-1">
                {detailPost?.userId === currentUser?.id && (
                  <>
                    <div className="w-64">
                      <CustomInput
                        name="label"
                        value={labelName}
                        placeholder="１５文字以内で入力してください"
                        onChange={changeLabel}
                        isError={labelName.length > 15}
                      />
                    </div>
                    <div className="w-28">
                      <CustomButton
                        text="ラベル"
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
              <ValidationMessage isError={labelName.length > 15}>
                タグ名が長すぎます
              </ValidationMessage>
              <div className="flex flex-row w-96 overflow-x-auto whitespace-nowrap space-x-2">
                {detailPost?.labels.map((label) => (
                  <CustomTag key={label.id} label={label} />
                ))}
              </div>
            </div>
            <form
              onSubmit={submitComment}
              className=" w-96 flex flex-col space-y-2 rounded-lg"
            >
              <div className="w-full md:h-104 h-80 p-2 space-y-3 overflow-auto bg-gray-100 rounded-md">
                {detailPost?.comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
              <TextArea
                value={comment}
                placeholder="コメントを140文字以内で入力してください"
                onChange={commentChange}
                isError={comment.length > 140}
              />
              <ValidationMessage isError={comment.length > 140}>
                コメントが長すぎます
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
                <CustomRateInput />
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
          <Disclosure.Button className=" text-blue-600 bg-blue-100 hover:bg-blue-200 md:w-1/2 w-8/12 rounded-lg border-blue-400 border-2 shadow-sm">
            <div
              onClick={toggleOpenDisclosure}
              className="flex flex-row justify-center space-x-2 py-2"
            >
              <span>詳細を見る</span>
              <ChevronDownIcon
                className={`${
                  openDisclosure ? '' : 'transform rotate-180'
                } w-5 h-5 text-purple-500`}
              />
            </div>
          </Disclosure.Button>
          <div className="md:w-6/12 w-8/12">
            <DisclosureText />
          </div>
          {/* <GoogleMapComponent post={detailPost} /> */}
          <div className="h-96 w-full bg-blue-200 "></div>
        </div>
        <CustomModal
          width="w-full"
          mdWidth="md:w-192"
          title="レストラン"
          isOpen={isOpenShopModal}
          closeModal={closeShopModal}
        >
          <ShopModal />
        </CustomModal>
        <CustomModal
          width="w-full"
          mdWidth="md:w-192"
          title="ホテル"
          isOpen={isOpenHotelModal}
          closeModal={closeHotelModal}
        >
          <HotelModal />
        </CustomModal>
        <ImageModal
          isOpen={isOpenImageModal}
          closeModal={closeImageModal}
          post={detailPost}
        />
      </Disclosure>
    </Layout>
  )
})
