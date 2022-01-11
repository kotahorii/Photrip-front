import { Input } from 'components/atoms/form/Input'
import { InputLabel } from 'components/atoms/form/InputLabel'
import { useAuth } from 'hooks/useAuth'
import { memo } from 'react'

// ログインフォームのコンポーネント
export const LoginForm = memo(() => {
  const { changeAuthData, userData } = useAuth()
  return (
    <>
      <div className=" flex flex-col items-center w-full">
        <InputLabel title="メールアドレス" />
        <Input
          name="email"
          value={userData.email}
          placeholder="example@gmail.com"
          onChange={changeAuthData}
        />
      </div>
      <div className=" flex flex-col items-center w-full">
        <InputLabel title="パスワード" />
        <Input
          name="password"
          value={userData.password}
          type="password"
          placeholder="••••••"
          onChange={changeAuthData}
        />
      </div>
    </>
  )
})
