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
        <div className=" flex flex-col space-y-1 mt-2">
          <div className="flex md:flex-row md:items-center flex-col w-full md:space-x-2">
            <div className="w-full">
              <CustomLabel title="タイトル" />
              <div className="md:w-96 w-full">
                <CustomInput
                  name="title"
                  value={editedPost.title}
                  placeholder="タイトルを30文字以内で入力してください"
                  onChange={changePost}
                  isError={editedPost.title.length > 30}
                />
              </div>
              <ValidationMessage isError={editedPost.title.length > 30}>
                {editedPost.title.length > 30 && '30文字以内で入力してください'}
              </ValidationMessage>
            </div>
            <div className="md:w-80 h-17 flex flex-col justify-between md:items-start md:mt-0 md:mb-0 mt-3 mb-1">
              <div>
                <CustomLabel title="郵便番号" />
              </div>
              <div className="flex flex-row items-center">
                <div className="md:w-56 w-full">
                  <CustomInput
                    name="address"
                    value={address}
                    onChange={changeAddress}
                    placeholder="例：739-0016"
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
          </div>
          <div className="flex flex-row items-end w-full md:space-x-2">
            <div className="flex flex-row space-x-2 items-center w-full">
              <div className="flex-1">
                <div className="flex flex-row">
                  <CustomLabel title="本文" />
                  <p className="ml-3">
                    {editedPost.body !== null ? editedPost.body.length : 0}/140
                  </p>
                </div>
                <TextArea
                  value={editedPost.body}
                  placeholder="本文を入力"
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
          <div className="flex md:flex-row flex-col w-full md:space-x-2">
            <div>
              <CustomLabel title="都道府県" />
              <CustomInput
                name="prefecture"
                value={editedPost.prefecture}
                placeholder="〇〇県"
                onChange={changePost}
                disabled={true}
              />
            </div>
            <div>
              <CustomLabel title="市、区" />
              <CustomInput
                name="city"
                value={editedPost.city}
                placeholder="〇〇市"
                onChange={changePost}
                disabled={true}
              />
            </div>
            <div>
              <CustomLabel title="町" />
              <CustomInput
                name="town"
                value={editedPost.town}
                placeholder="〇〇町"
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
