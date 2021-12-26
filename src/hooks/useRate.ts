import { useCallback, useState } from 'react'
import { Post } from 'types/postType'
import { User } from 'types/userType'
import { useRateMutate } from './queries/useMutationRate'
import { useDetailPost } from './useDetailPost'
import { useMain } from './useMain'

export const useRates = () => {
  const { createRateMutation, updateRateMutation } = useRateMutate()
  const { currentUser, usersPost } = useMain()
  const { detailPost } = useDetailPost()

  const myRate = useCallback(
    (post: Post | undefined) =>
      post?.rates.filter((rate) => rate.userId === currentUser?.id)[0],
    [currentUser?.id]
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
      !post
        ? 0
        : (
            post.rates
              .map((rate) => rate.rate)
              .reduce((acc, cur) => acc + cur, 0) / post.rates.length
          ).toFixed(1),
    []
  )
  const getAllRate = useCallback(
    (user: User | undefined) =>
      usersPost(user) === []
        ? 0
        : usersPost(user)
            ?.map((post) => post.rates.length)
            .reduce((sum, cur) => sum + cur, 0),
    [usersPost]
  )
  return {
    rate,
    rateCreate,
    rateUpdate,
    myRate,
    averageRate,
    getAllRate,
  }
}
