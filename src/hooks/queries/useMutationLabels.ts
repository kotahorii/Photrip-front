import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { CreateLabel, Label } from 'types/postType'

export const useMutationLabels = () => {
  const queryClient = useQueryClient()
  const createLabelMutation = useMutation(
    (data: CreateLabel) =>
      client.post<Label>('labels', data, {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res) => {
        const previousLabels = queryClient.getQueryData<Label[]>('labels')
        if (previousLabels) {
          queryClient.setQueryData<Label[]>('labels', [
            res.data,
            ...previousLabels,
          ])
        }
      },
    }
  )
  const deleteLabelMutation = useMutation(
    (id: number) => client.delete(`labels/${id}`),
    {
      onSuccess: (res, variable) => {
        const previousLabels = queryClient.getQueryData<Label[]>('labels')
        if (previousLabels) {
          queryClient.setQueryData<Label[]>(
            'labels',
            previousLabels.filter((label) => label.id !== variable)
          )
        }
      },
    }
  )
  return { createLabelMutation, deleteLabelMutation }
}
