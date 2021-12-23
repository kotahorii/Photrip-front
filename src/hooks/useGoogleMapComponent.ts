export const useGoogleMapComponent = () => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  }

  const options = {
    disableDefaultUI: false,
    zoomControl: true,
  }

  const circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 3000,
    zIndex: 1,
  }
  return { containerStyle, options, circleOptions }
}
