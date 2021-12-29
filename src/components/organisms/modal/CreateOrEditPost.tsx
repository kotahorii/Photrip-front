import { CustomButton } from 'components/atoms/button/CustomButton'
import { CustomInput } from 'components/atoms/form/CustomInput'
import { CustomLabel } from 'components/atoms/form/CustomLabel'
import { TextArea } from 'components/atoms/form/TextArea'
import { ValidationMessage } from 'components/atoms/form/ValidationMessage'
import { PostImageInput } from 'components/molecules/postImage/PostImageInput'
import { useApi } from 'hooks/useApi'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'

export const CreateOrEditPost = memo(() => {
  const {
    editedPost,
    changePost,
    changeBody,
    submitPost,
    validationCreatePost,
  } = useMain()
  const {
    address,
    changeAddress,
    setAddressData,
    isNotValidData,
    isLoadingAddress,
    isRefetchingAddress,
  } = useApi()
  return (
    <>
      <form onSubmit={submitPost} className="md:p-3">
        <div className=" flex flex-col space-y-2 mt-2">
          <div className="flex md:flex-row md:items-center flex-col w-full md:space-x-2">
            <div className="w-full">
              <div className="ml-3">
                <CustomLabel title="タイトル" />
              </div>
              <CustomInput
                name="title"
                value={editedPost.title}
                placeholder="タイトル"
                onChange={changePost}
                isError={editedPost.title.length > 30}
              />
              <ValidationMessage isError={editedPost.title.length > 30}>
                {editedPost.title.length > 30 && '30文字以内で入力してください'}
              </ValidationMessage>
            </div>
          </div>
          <div className="flex flex-row items-end w-full md:space-x-2">
            <div className="flex flex-row space-x-2 items-center w-full">
              <div className="flex-1">
                <div className="flex flex-row ml-3 my-2">
                  <CustomLabel title="本文" />
                  <p className="ml-3 text-sm">
                    {editedPost.body !== null ? editedPost.body.length : 0}/140
                  </p>
                </div>
                <TextArea
                  value={editedPost.body}
                  placeholder="本文"
                  onChange={changeBody}
                  isError={
                    editedPost.body !== null && editedPost.body.length > 140
                  }
                />
              </div>
            </div>
          </div>
          <ValidationMessage
            isError={editedPost.body !== null && editedPost.body.length > 140}
          >
            140字以内で入力してください
          </ValidationMessage>
          <div className="flex md:flex-row md:space-x-3 flex-col">
            <div className="md:w-80 h-16 flex flex-col justify-between md:items-start md:mt-0 md:mb-0 mt-3 mb-1">
              <div className="ml-3">
                <CustomLabel title="郵便番号" />
              </div>
              <div className="flex flex-row space-x-1 items-center">
                <div className="md:w-48 w-full">
                  <CustomInput
                    name="address"
                    value={address}
                    onChange={changeAddress}
                    placeholder="郵便番号"
                  />
                </div>
                <div className="md:w-24 w-32">
                  <CustomButton
                    text="自動入力"
                    disabled={isNotValidData()}
                    loading={isLoadingAddress || isRefetchingAddress}
                    onClick={setAddressData}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="ml-3">
                <CustomLabel title="旅行先住所" />
              </div>
              <CustomInput
                name="prefecture"
                value={
                  editedPost.prefecture + editedPost.city + editedPost.town
                }
                placeholder="郵便番号から自動入力されます"
                onChange={changePost}
                disabled={true}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-64 flex flex-col md:space-y-4 space-y-2 md:mt-3 mt-2 items-center">
          <PostImageInput />
          <CustomButton
            disabled={validationCreatePost()}
            type="submit"
            text={`${editedPost.id === 0 ? '投稿' : '編集'}`}
          />
        </div>
      </form>
    </>
  )
})
