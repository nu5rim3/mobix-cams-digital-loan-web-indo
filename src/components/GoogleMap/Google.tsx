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
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

interface GoogleMapProps {
  google: any;
  lat: any;
  lng: any
}

class GoogleMap extends React.Component<GoogleMapProps> {
  render() {
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