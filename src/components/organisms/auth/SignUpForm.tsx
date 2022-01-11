import { Input } from 'components/atoms/form/Input'
import { InputLabel } from 'components/atoms/form/InputLabel'
import { PrefectureSelector } from 'components/atoms/form/PrefectureSelector'
import { ErrorMessage } from 'components/atoms/form/ErrorMessage'
import { ProfileImageInput } from 'components/molecules/userIcon/ProfileImageInput'
import { prefectures } from 'data/prefecture'
import { useAuth } from 'hooks/useAuth'
import { memo } from 'react'

// 新規登録フォームのコンポーネント
export const SignUpForm = memo(() => {
  const { userData, changeAuthData, prefectureChange } = useAuth()
  return (
    <>
      <div className=" flex flex-col space-y-1 w-full">
        <InputLabel title="名前" />
        <Input
          name="name"
          value={userData.name}
          placeholder="名前"
          onChange={changeAuthData}
          isError={userData.name.length > 20}
        />
        <ErrorMessage isError={userData.name.length > 20}>
          20文字以内で入力してください
        </ErrorMessage>
      </div>
      <div className=" flex flex-col space-y-1 w-full">
        <InputLabel title="メールアドレス" />
        <Input
          name="email"
          value={userData.email}
          placeholder="example@test.com"
          onChange={changeAuthData}
        />
      </div>
      <div className=" flex flex-col space-y-1 w-full">
        <InputLabel title="パスワード" />
        <Input
          name="password"
          value={userData.password}
          placeholder="••••••"
          type="password"
          onChange={changeAuthData}
        />
      </div>
      <div className=" flex flex-col space-y-1 w-full">
        <InputLabel title="パスワード（確認用）" />
        <Input
          name="passwordConfirmation"
          value={userData.passwordConfirmation}
          placeholder="••••••"
          type="password"
          onChange={changeAuthData}
          isError={
            userData.passwordConfirmation.length >= 6 &&
            userData.passwordConfirmation !== userData.password
          }
        />
        <ErrorMessage
          isError={
            userData.passwordConfirmation.length >= 6 &&
            userData.passwordConfirmation !== userData.password
          }
        >
          パスワードが一致しません
        </ErrorMessage>
      </div>
      <div className="flex flex-row justify-between items-center space-x-3">
        <div className="flex flex-col w-44 space-y-3">
          <InputLabel title="都道府県" />
          <PrefectureSelector
            value={userData.prefecture}
            onChange={prefectureChange}
            arrays={prefectures}
          />
        </div>
        <div className="flex flex-row justify-center">
          <ProfileImageInput />
        </div>
      </div>
    </>
  )
})
