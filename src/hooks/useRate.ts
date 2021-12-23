import { useCallback, useState } from 'react'
import { Post } from 'types/postType'
import { User } from 'types/userType'
import { useRateMutate } from './queries/useMutationRate'
import { useQueryRates } from './queries/useQueryRates'
import { useDetailPost } from './useDetailPost'
import { useMain } from './useMain'

export const useRates = () => {
  const { data: rates, isLoading: isLoadingRates } = useQueryRates()
  const { createRateMutation, updateRateMutation } = useRateMutate()
  const { currentUser, usersPost } = useMain()
  const { detailPost } = useDetailPost()

  const postsRates = useCallback(
    (post: Post | undefined) =>
      rates?.filter((rate) => rate.postId === post?.id),
    [rates]
  )

  const myRate = useCallback(
    (post: Post | undefined) =>
      postsRates(post)?.filter((rate) => rate.userId === currentUser?.id)[0],
    [postsRates, currentUser?.id]
  )

  const [rate, setRate] = useState<number | undefined>(myRate(detailPost)?.rate)

  const rateCreate = useCallback(
    (num: number) => () => {
      setRate(num)
      createRateMutation.mutate({ rate: num, postId: detailPost?.id })
    },
    [createRateMutation, detailPost?.id]
  )
  const rateUpdate = useCallback(
    (num: number) => () => {
      setRate(num)
      updateRateMutation.mutate({
        id: myRate(detailPost)?.id,
        postId: detailPost?.id,
        rate: num,
      })
    },
    [detailPost, updateRateMutation, myRate]
  )

  const averageRate = useCallback(
    (post: Post | undefined) =>
      postsRates(post) &&
      (
        postsRates(post)!
          .map((rate) => rate.rate)
          .reduce((acc, cur) => acc + cur, 0) / postsRates(post)!.length
      ).toFixed(1),
    [postsRates]
  )
  const getAllRate = useCallback(
    (user: User | undefined) =>
      usersPost(user) === []
        ? 0
        : usersPost(user)
            ?.map(
              (post) => rates?.filter((rate) => rate.postId === post.id).length
            )
            .reduce((sum, cur) => sum! + cur!, 0),
    [usersPost, rates]
  )
  return {
    rate,
    rateCreate,
    rateUpdate,
    myRate,
    averageRate,
    postsRates,
    isLoadingRates,
    getAllRate,
  }
}
