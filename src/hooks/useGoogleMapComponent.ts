export const useGoogleMapComponent = () => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  }

  const options = {
    disableDefaultUI: false,
    zoomControl: true,
  }

  return { containerStyle, options }
}
