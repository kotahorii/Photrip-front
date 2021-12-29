import { CustomButton } from 'components/atoms/button/CustomButton'
import { CustomInput } from 'components/atoms/form/CustomInput'
import { CustomLabel } from 'components/atoms/form/CustomLabel'
import { CustomSelector } from 'components/atoms/form/CustomSelector'
import { TextArea } from 'components/atoms/form/TextArea'
import { ValidationMessage } from 'components/atoms/form/ValidationMessage'
import { ImageInput } from 'components/molecules/userIcon/ImageInput'
import { prefectures } from 'data/prefecture'
import { useAuth } from 'hooks/useAuth'
import { useUsers } from 'hooks/useUsers'
import { memo } from 'react'

export const EditUserText = memo(() => {
  const { userData, changeAuthData, changeIntroduction, prefectureChange } =
    useAuth()
  const { updateUser } = useUsers()
  return (
    <form onSubmit={updateUser} className=" mt-2 flex flex-col space-y-2">
      <CustomLabel title="名前" />
      <CustomInput
        name="name"
        value={userData.name}
        placeholder="名前を入力"
        onChange={changeAuthData}
        isError={!userData.name || userData.name.length > 20}
      />
      <ValidationMessage isError={!userData.name || userData.name.length > 20}>
        {!userData.name
          ? '名前は必須です'
          : userData.name.length > 20
          ? '名前が長すぎます'
          : null}
      </ValidationMessage>
      <div className="flex flex-row w-full justify-center">
        <CustomLabel title="自己紹介" />
        <span className="ml-3 text-sm">
          {userData.introduction !== null ? userData.introduction.length : 0}
          /140
        </span>
      </div>
      <div className="flex flex-row items-center space-x-1 w-full">
        <TextArea
          value={userData.introduction}
          placeholder="自己紹介を入力してください"
          onChange={changeIntroduction}
          isError={
            userData.introduction !== null && userData.introduction.length > 140
          }
        />
      </div>
      <ValidationMessage
        isError={
          userData.introduction !== null && userData.introduction.length > 140
        }
      >
        140文字以内で入力してください
      </ValidationMessage>
      <div className="flex flex-row items-center mb-2 justify-between">
        <div className="flex flex-col w-36 space-y-2">
          <CustomLabel title="都道府県" />
          <CustomSelector
            value={userData.prefecture}
            onChange={prefectureChange}
            arrays={prefectures}
          />
        </div>
        <ImageInput />
        <div></div>
      </div>
      <CustomButton
        disabled={!userData.name || userData.name.length > 20}
        type="submit"
        text="更新"
      />
    </form>
  )
})
