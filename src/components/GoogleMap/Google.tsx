
import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Button, Tooltip } from 'antd';

interface GoogleMapProps {
  google: any;
  lat?: any;
  lng?: any;
  name?: any;
  locations?: any[];
  onMarkerClick: any;
}

class GoogleMap extends React.Component<GoogleMapProps> {
  
  state = {
    currentPosotion : ''
  }

  add = (newLocation: any) => {
    this.setState({
      currentPosotion : newLocation
    })
  }


  render() {


  //   var points = [
  //     { lat: 42.02, lng: -77.01 },
  //     { lat: 42.03, lng: -77.02 },
  //     { lat: 41.03, lng: -77.04 },
  //     { lat: 42.05, lng: -77.02 }
  //   ]
  //   var bounds = new this.props.google.maps.LatLngBounds();
  //   for (var i = 0; i < points.length; i++) {
  //     bounds.extend(points[i]);
  //   }

    return (
      <>

        {/* <Tooltip placement="topLeft" title={'tesxt'} className='m-1'>
          <Button>{this.state.currentPosotion}</Button>
        </Tooltip> */}

        <Map
          google={this.props.google}
          initialCenter={
            this.props.lat
            ? { lat: this.props.lat, lng: this.props.lng }
            : {
              lat: this.props.locations?.[0].latitude, lng: this.props.locations?.[0].longitude
            }
          }
          zoom={14}
        >
          {this.props.lat?
            <Marker 
              onClick={() => console.log(this.onMarkerClick)}
              name={this.props.name} 
              onMouseover={(p:any) => {
                console.log("hovering", p) 
                this.add(p.name)
              }}
            />
          :
            this.props.locations?.map((location: any, index: any) => {
              return (
                <Marker 
                    key={index}
                    onClick={() => console.log(this.onMarkerClick)}
                    name={location.imgOriginalName} 
                    onMouseover={(p:any) => {
                      this.add(p.name)
                    }}
                />
                )
            }) 
            
          }
        </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCKxfeLmSNo34XeAogaq3vNb0WgDI20TDE' // Replace with your API key
})(GoogleMap);