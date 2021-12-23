import { useAppDispatch, useAppSelector } from 'app/hooks'
import axios from 'axios'
import { useQuery } from 'react-query'
import { selectEditedPost, setEditPost } from 'slices/postSlice'
import { AddressQueryType, AddressRes } from 'types/apiTypes'

const getAddressData = async (address: string) => {
  const { data } = await axios.get<AddressRes>(
    `${process.env.REACT_APP_ADDRESS_URL}${address}`
  )
  return data.results[0]
}

export const useQueryAddress = (address: string) => {
  const dispatch = useAppDispatch()
  const editedPost = useAppSelector(selectEditedPost)

  return useQuery<AddressQueryType, Error>({
    queryKey: 'address',
    queryFn: () => getAddressData(address),
    staleTime: Infinity,
    enabled: false,
    onSuccess: (data) => {
      dispatch(
        setEditPost({
          ...editedPost,
          prefecture: data.address1,
          city: data.address2,
          town: data.address3,
        })
      )
    },
  })
}
