import React from 'react';
import {createRoot} from 'react-dom/client';

import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Marker,
  Pin
} from '@vis.gl/react-google-maps';

// import ControlPanel from './control-panel';
// import {MovingMarker} from './moving-marker';

import MarkerWithInfowindow from './info';

// const API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;

const GoogleVis = ({
  locations
}: {
  locations: any[]
}) => {

  return (
    <APIProvider apiKey={'AIzaSyCKxfeLmSNo34XeAogaq3vNb0WgDI20TDE'} libraries={['marker']}>
      <Map
        mapId={'55888888'}
        zoom={17}
        center={{lat: locations?.[0]?.latitude? Number(locations?.[0]?.latitude): 0 , lng: locations?.[0].longitude? Number(locations?.[0].longitude): 0}}
        gestureHandling={'greedy'}
        // disableDefaultUI={true}
        >
        {/* simple marker */}

        {/* <Marker
          position={{lat: 10, lng: 10}}
          clickable={true}
          onClick={() => alert('marker was clicked!')}
          title={'clickable google.maps.Marker xx'}
        /> */}

        {/* advanced marker with customized pin */}
        {/* <AdvancedMarker
          position={{lat: 20, lng: 10}}
          title={'AdvancedMarker with customized pin. 1'}>
          <Pin
            background={'#22ccff'}
            borderColor={'#1e89a1'}
            glyphColor={'#0f677a'}></Pin>
        </AdvancedMarker> */}

        {/* advanced marker with html-content */}
        {/* <AdvancedMarker
          position={{lat: 30, lng: 10}}
          title={'AdvancedMarker with custom html content. 2'}>
          <div
            style={{
              width: 16,
              height: 16,
              position: 'absolute',
              top: 0,
              left: 0,
              background: '#1dbe80',
              border: '2px solid #0e6443',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
        </AdvancedMarker> */}

        {/* simple positioned infowindow */}
        {/* <InfoWindow position={{lat: 40, lng: 0}} maxWidth={200} visible>
          <p>
            This is the content for another infowindow with <em>HTML</em>
            -elements.
          </p>
        </InfoWindow> */}

        {/* continously updated marker */}
        {/* <MovingMarker /> */}

        {/* simple stateful infowindow */}
        {locations?.map((location: any , index: any) => {
          return <MarkerWithInfowindow 
            key={index}
            location={location}
          />
        })}
      </Map>

      {/* <ControlPanel /> */}
    </APIProvider>
  );
};

export default GoogleVis;
