import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { CreateRate, Rate, UpdateRate } from 'types/postType'

export const useRateMutate = () => {
  const queryClient = useQueryClient()
  const createRateMutation = useMutation(
    (data: CreateRate) =>
      client.post<Rate>('rates', data, {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res) => {
        const previousRates = queryClient.getQueryData<Rate[]>('rates')
        if (previousRates) {
          queryClient.setQueryData<Rate[]>('rates', [
            res.data,
            ...previousRates,
          ])
        }
      },
    }
  )
  const updateRateMutation = useMutation(
    (data: UpdateRate) =>
      client.put<Rate>(`rates/${data.id}`, data, {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res, variable) => {
        const previousRates = queryClient.getQueryData<Rate[]>('rates')
        if (previousRates) {
          queryClient.setQueryData<Rate[]>(
            'rates',
            previousRates.map((rate) =>
              rate.id === variable.id ? res.data : rate
            )
          )
        }
      },
    }
  )
  return { createRateMutation, updateRateMutation }
}
