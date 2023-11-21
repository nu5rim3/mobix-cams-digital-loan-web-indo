// import React,{Component} from 'react';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// export class MapContainer extends Component {
    
//     render() {
        
//         const style = {
//             width: '100%',
//             height: '100%'
//         }

//       return (
//         <Map google={this.props.google} zoom={15}
//             style={style}
//             initialCenter={{
//             lat: this.props.latitude,
//             lng: this.props.longitude
//             }}
//         >
   
//           <Marker onClick={this.onMarkerClick}
//                   name={'Current location'} />
   
//           <InfoWindow onClose={this.onInfoWindowClose}>
//               {/* <div>
//                 <h1>University Location</h1>
//               </div> */}
//           </InfoWindow>
//         </Map>
//       );
//     }
// }
   

// // export default GoogleMap;
// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyBha2m_o8kKChjguj0zmwp0xK3H0Mq03hg'
//   })(MapContainer);

import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

interface GoogleMapProps {
  google: any;
  lat: any;
  lng: any
}

class GoogleMap extends React.Component<GoogleMapProps> {
  render() {
    var points = [
      { lat: 42.02, lng: -77.01 },
      { lat: 42.03, lng: -77.02 },
      { lat: 41.03, lng: -77.04 },
      { lat: 42.05, lng: -77.02 }
    ]
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }

    return (
      <Map
        google={this.props.google}
        initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
        zoom={14}
      >
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
      </Map>
    );

    // return (
    //   <Map
    //       google={this.props.google}
    //       initialCenter={{
    //         lat: 37.790000, lng: -122.405640
    //       }}
          // bounds={bounds}
          // >
             {/* <Marker
                
                title='The marker`s title will appear as a tooltip.'
                name={'SOMA'}
                position={{lat: 37.778519, lng: -122.405640}} /> */}

            {/* <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                          <h1>{'Helloo'}</h1>
                        </div>
                    </InfoWindow> */}

              {/* <Marker
                  name={'Dolores park'}
                  position={{lat: 37.759703, lng: -122.428093}} /> */}

              {/* <Marker
                  name={'Your position'}
                  position={{lat: 37.762391, lng: -122.439192}}
                  icon={{
                    url: "/path/to/custom_icon.png",
                    anchor: new google.maps.Point(32,32),
                    scaledSize: new google.maps.Size(64,64)
                  }} /> */}
              {/* <Marker /> */}
            
      // </Map>
  // );
  
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCKxfeLmSNo34XeAogaq3vNb0WgDI20TDE' // Replace with your API key
})(GoogleMap);

// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import { Component } from 'react';
 
// export class MapContainer extends Component {
//   render() {
//     return (
//       <Map google={this.props.google} zoom={14}>
 
//         <Marker onClick={this.onMarkerClick}
//                 name={'Current location'} />
 
//         <InfoWindow onClose={this.onInfoWindowClose}>
//             <div>
//               <h1>{this.state.selectedPlace.name}</h1>
//             </div>
//         </InfoWindow>
//       </Map>
//     );
//   }
// }
 
// export default GoogleApiWrapper({
//   apiKey: ('3343434')
// })(MapContainer)

// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// const MyMapComponent = withScriptjs(withGoogleMap((props) =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//     {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//   </GoogleMap>
// ))

//   export default MyMapComponent