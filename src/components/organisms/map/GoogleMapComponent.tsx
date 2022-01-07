import { memo, VFC } from 'react'
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api'
import { useGoogleMapComponent } from 'hooks/useGoogleMapComponent'
import { Post } from 'types/postType'

type Props = {
  post: Post | undefined
}

export const GoogleMapComponent: VFC<Props> = memo(({ post }) => {
  const { containerStyle, options } = useGoogleMapComponent()
  const center = post && {
    lat: post.lat === null ? 35.702259 : post.lat,
    lng: post.lng === null ? 139.774473 : post.lng,
  }
  const position = post && {
    lat: post.lat === null ? 35.702259 : post.lat,
    lng: post.lng === null ? 139.774473 : post.lng,
  }
  return (
    <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAP_API}`}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        options={options}
      >
        <InfoWindow position={position}>
          <div className="bg-white font-semibold h-8 p-1 text-lg">
            <h1>{post?.title}</h1>
          </div>
        </InfoWindow>
      </GoogleMap>
    </LoadScript>
  )
})
