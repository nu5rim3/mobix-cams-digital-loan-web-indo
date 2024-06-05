import React, {useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import convertImageName from '../../utils/convertImageName';

 const MarkerWithInfowindow = ({
  location
 }:{
  location: any
 }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{lat: Number(location?.latitude) , lng: Number(location?.longitude)}}
        title={convertImageName(location.imgSubCategory)}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}>
            <h4>{convertImageName(location.imgSubCategory)}</h4>
            <p className='mt-1'>{location?.lastModifiedDate}</p>
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfowindow