import { ChangeEvent, useCallback, useState } from 'react'
import { Label, Post } from 'types/postType'
import { useMutationLabels } from './queries/useMutationLabels'
import { useDetailPost } from './useDetailPost'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectSearchedLabel,
  selectSearchPrefecture,
  selectSelectedOption,
  setSearchedLabel,
  setSearchPrefecture,
  setSelectedOption,
} from 'slices/postSlice'

export const useSearch = () => {
  const { id } = useDetailPost()
  const { createLabelMutation, deleteLabelMutation } = useMutationLabels()
  const dispatch = useAppDispatch()
  const searchedLabel = useAppSelector(selectSearchedLabel)
  const searchPrefecture = useAppSelector(selectSearchPrefecture)
  const selectedOption = useAppSelector(selectSelectedOption)
  const [labelName, setLabelName] = useState('')

  const changeLabel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setLabelName(e.target.value),
    []
  )

  // ラベル作成処理
  const createLabel = useCallback(() => {
    createLabelMutation.mutate({ postId: Number(id), name: labelName })
    setLabelName('')
  }, [id, labelName, createLabelMutation])
  // ラベル削除処理
  const deleteLabel = useCallback(
    (label: Label) => () => deleteLabelMutation.mutate(label.id),
    [deleteLabelMutation]
  )
  const changeSearchedLabel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(setSearchedLabel(e.target.value)),
    [dispatch]
  )

  // 投稿のタイトルとラベル名で検索するための処理
  const filteredPosts = useCallback(
    (posts: Post[] | undefined) =>
      searchedLabel.length > 0
        ? posts?.filter(
            (post) =>
              post.labels.filter((label) => label.name.includes(searchedLabel))
                .length > 0 || post.title.includes(searchedLabel)
          )
        : posts,
    [searchedLabel]
  )

  // 都道府県のSelectを変更するための処理
  const changeSearchPrefecture = useCallback(
    (e: ChangeEvent<{ value: unknown }>) =>
      dispatch(setSearchPrefecture(e.target.value as number)),
    [dispatch]
  )

  // どのラジオボタンを選択しているかを表す変数
  const handleOptionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(setSelectedOption(e.target.value)),
    [dispatch]
  )

  // ラベル投稿中のローディング処理のための変数を定義
  const labelPostLoading = useCallback(
    () => createLabelMutation.isLoading,
    [createLabelMutation]
  )

  // 投稿をいいねが多い順に並び替える処理
  const favPosts = useCallback(
    (posts: Post[] | undefined) =>
      posts?.slice().sort((a, b) => b.favorites.length - a.favorites.length),
    []
  )

  // 投稿を評価数が多い順に並び替える処理
  const ratePosts = useCallback(
    (posts: Post[] | undefined) =>
      posts?.slice().sort((a, b) => b.rates.length - a.rates.length),
    []
  )

  // 評価の平均値を求める処理
  const rateAve = useCallback(
    (post: Post) =>
      post.rates.map((rate) => rate.rate).reduce((acc, cur) => acc + cur, 0) /
      post.rates.length,
    []
  )

  // 投稿を評価の平均値が高い順に並び替える処理
  const rateAvePosts = useCallback(
    (posts: Post[] | undefined) =>
      posts
        ?.slice()
        .sort((a, b) =>
          rateAve(a) > rateAve(b) || rateAve(b).toString() === 'NaN' ? -1 : 1
        ),
    [rateAve]
  )

  return {
    selectedOption,
    handleOptionChange,
    changeLabel,
    labelName,
    createLabel,
    changeSearchedLabel,
    searchedLabel,
    deleteLabel,
    filteredPosts,
    searchPrefecture,
    changeSearchPrefecture,
    labelPostLoading,
    favPosts,
    ratePosts,
    rateAvePosts,
    rateAve,
  }
}
