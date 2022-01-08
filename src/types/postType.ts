import { comment, favorite, label, postRes, rate } from 'data/response'

// GETメソッドのレスポンスの型
export type Post = typeof postRes

// POSTメソッドのリクエストの型
export type CreatePost = {
  body: string
  title: string
  prefecture: string
  city: string
  town: string
  lat: number
  lng: number
  image: string
}

export type LatLngType = {
  lat: number
  lng: number
}

// 画像を投稿するためにFormDataに変換
export type CreatePostFormData = FormData & {
  append(name: keyof CreatePost, value: String | Blob, fileName?: string): any
}

// PUTメソッドのリクエストの型
export type UpdatePost = CreatePost & { id: number }
export type UpdatePostFormData = FormData & {
  append(name: keyof UpdatePost, value: String | Blob, fileName?: string): any
}

// コメントのGETメソッドのレスポンスの型
export type Comment = typeof comment
// コメントのPOSTメソッドのリクエストの型
export type CreateComment = {
  postId: number | undefined
  comment: string
}
// コメントのDELETEメソッドのリクエストの型
export type DeleteComment = {
  id: number
  postId: string
}

export type Favorite = typeof favorite
export type CreateFavorite = {
  postId: number | undefined
}
export type DeleteFavorite = CreateFavorite & { id: number | undefined }

export type Rate = typeof rate
export type CreateRate = {
  postId: number | undefined
  rate: number
}
export type UpdateRate = CreateRate & { id: number | undefined }

export type Label = typeof label
export type CreateLabel = {
  postId: number | undefined
  name: string
}

// メニューコンポーネントのPropsの型
export type MenuType = {
  name: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  onClick?: () => void
}[]
