import { userRes } from 'data/response'

// 新規登録のPOSTメソッドのリクエストの型
export type SignUpData = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  introduction: string
  image: string
  prefecture: number
}

// 画像を投稿するためにFormDataに変換
export type SignUpFormData = FormData & {
  append(name: keyof SignUpData, value: String | Blob, fileName?: string): any
}

// ログインのPOSTメソッドのリクエストの型
export type SignInData = {
  email: string
  password: string
}

// レスポンスのユーザーの情報の型
export type User = typeof userRes
export type AuthRes = { data: User }

// ユーザー更新のPUTメソッドのリクエストの型
export type UpdateUserData = {
  id: number
  name?: string
  introduction?: string
  prefecture?: number
  image?: string
}
export type UpdateUserFormData = FormData & {
  append(
    name: keyof UpdateUserData,
    value: String | Blob,
    fileName?: string
  ): any
}
