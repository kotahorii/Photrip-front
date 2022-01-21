import { PrimaryButton } from 'components/atoms/button/PrimaryButton'
import { ErrorMessage } from 'components/atoms/form/ErrorMessage'
import { Input } from 'components/atoms/form/Input'
import { InputLabel } from 'components/atoms/form/InputLabel'
import { PrefectureSelector } from 'components/atoms/form/PrefectureSelector'
import { TextArea } from 'components/atoms/form/TextArea'
import { ProfileImageInput } from 'components/molecules/userIcon/ProfileImageInput'
import { prefectures } from 'data/prefecture'
import { useAuth } from 'hooks/useAuth'
import { useUsers } from 'hooks/useUsers'
import { memo } from 'react'

// プロフィール編集用のモーダル
export const EditUserText = memo(() => {
  const { userData, changeAuthData, changeIntroduction, prefectureChange } =
    useAuth()
  const { updateUser } = useUsers()
  return (
    <form
      onSubmit={updateUser}
      className=" mt-2 flex flex-col items-start space-y-2"
    >
      <InputLabel title="名前" />
      <Input
        name="name"
        value={userData.name}
        placeholder="名前"
        onChange={changeAuthData}
        isError={!userData.name || userData.name.length > 20}
      />
      <ErrorMessage isError={!userData.name || userData.name.length > 20}>
        {!userData.name
          ? '名前は必須です'
          : userData.name.length > 20
          ? '20文字以内で入力してください'
          : null}
      </ErrorMessage>
      <div className="flex flex-row justify-center">
        <InputLabel title="自己紹介" />
        <span className="ml-3 text-sm">
          {userData.introduction !== null ? userData.introduction.length : 0}
          /140
        </span>
      </div>
      <div className="flex flex-row items-center space-x-1 w-full">
        <TextArea
          value={userData.introduction}
          placeholder="自己紹介"
          onChange={changeIntroduction}
          isError={
            userData.introduction !== null && userData.introduction.length > 140
          }
        />
      </div>
      <ErrorMessage
        isError={
          userData.introduction !== null && userData.introduction.length > 140
        }
      >
        140文字以内で入力してください
      </ErrorMessage>
      <div className="flex flex-row w-full items-center mb-2 justify-center space-x-10">
        <div className="flex flex-col justify-start w-36 space-y-2">
          <div>
            <InputLabel title="都道府県" />
          </div>
          <PrefectureSelector
            value={userData.prefecture}
            onChange={prefectureChange}
            arrays={prefectures}
          />
        </div>
        <ProfileImageInput />
      </div>
      <PrimaryButton
        disabled={!userData.name || userData.name.length > 20}
        type="submit"
        text="プロフィールを更新"
      />
    </form>
  )
})
