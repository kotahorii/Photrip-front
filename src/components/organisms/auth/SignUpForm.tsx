import { CustomInput } from 'components/atoms/form/CustomInput'
import { CustomLabel } from 'components/atoms/form/CustomLabel'
import { CustomSelector } from 'components/atoms/form/CustomSelector'
import { ValidationMessage } from 'components/atoms/form/ValidationMessage'
import { ImageInput } from 'components/molecules/userIcon/ImageInput'
import { prefectures } from 'data/prefecture'
import { useAuth } from 'hooks/useAuth'
import { memo } from 'react'

export const SignUpForm = memo(() => {
  const { userData, changeAuthData, prefectureChange } = useAuth()
  return (
    <>
      <div className=" flex flex-col space-y-1 w-full">
        <CustomLabel title="名前" />
        <CustomInput
          name="name"
          value={userData.name}
          placeholder="名前"
          onChange={changeAuthData}
          isError={userData.name.length > 20}
        />
        <ValidationMessage isError={userData.name.length > 20}>
          20文字以内で入力してください
        </ValidationMessage>
      </div>
      <div className=" flex flex-col space-y-1 w-full">
        <CustomLabel title="メールアドレス" />
        <CustomInput
          name="email"
          value={userData.email}
          placeholder="example@test.com"
          onChange={changeAuthData}
        />
      </div>
      <div className=" flex flex-col space-y-1 w-full">
        <CustomLabel title="パスワード" />
        <CustomInput
          name="password"
          value={userData.password}
          placeholder="••••••"
          type="password"
          onChange={changeAuthData}
        />
      </div>
      <div className=" flex flex-col space-y-1 w-full">
        <CustomLabel title="パスワード（確認用）" />
        <CustomInput
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
        <ValidationMessage
          isError={
            userData.passwordConfirmation.length >= 6 &&
            userData.passwordConfirmation !== userData.password
          }
        >
          パスワードが一致しません
        </ValidationMessage>
      </div>
      <div className="flex flex-row justify-between items-center space-x-3">
        <div className="flex flex-col w-44 space-y-3">
          <CustomLabel title="都道府県" />
          <CustomSelector
            value={userData.prefecture}
            onChange={prefectureChange}
            arrays={prefectures}
          />
        </div>
        <div className="flex flex-row justify-center">
          <ImageInput />
        </div>
      </div>
    </>
  )
})
