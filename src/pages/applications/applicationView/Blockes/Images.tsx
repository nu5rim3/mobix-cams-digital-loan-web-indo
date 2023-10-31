import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { API } from '../../../../services/Services';
import ImageDisplay from '../../../../components/Image/ImageViewerByHash';
import Title from '../../../../components/Typography/Tytle';
import GoogleMapReact from 'google-map-react';
import Google from '../../../../components/GoogleMap/Google';
import ImageZoom from '../../../../test/ImageTest';


export interface IImagesProps {
}


export default function Images (props: IImagesProps) {

    const K_WIDTH = 40;
    const K_HEIGHT = 40;


    const greatPlaceStyle = {
        position: 'absolute',
        width: K_WIDTH,
        height: K_HEIGHT,
        left: -K_WIDTH / 2,
        top: -K_HEIGHT / 2,
        border: '5px solid #f44336',
        borderRadius: K_HEIGHT,
        backgroundColor: 'white',
        textAlign: 'center',
        color: '#3f51b5',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 4
      };
    
    const {
        imageDetails
    } = useSelector((state: any) => state.Application)

    const AnyReactComponent = (text: any) =>{ 
    return <div style={{
        position:'absolute',
        // width: K_WIDTH,
        // height: K_HEIGHT,
        // left: -K_WIDTH / 2,
        // top: -K_HEIGHT / 2,
        // border: '5px solid #f44336',
        // borderRadius: K_HEIGHT,
        // backgroundColor: 'white',
        // textAlign: 'center',
        // color: '#3f51b5',
        // fontSize: 16,
        // fontWeight: 'bold',
        // padding: 4
    }}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADDklEQVR4nO2Zy2sUQRDGyxdRfCCiRFEQREFQMCeNp5yEPWQz89XQUSGwt4DgSQUPHoISxJskHnz9BR704E28KL4SEb0IelUkmKigmE22OtGW3ixJIA961u7ZWfGDhmGm6Zlff9U1XTNE/7VQpqtroyTJSc18S5hfCjAmgK61MWEerl4DTti+lDcZYIcwXxfmsmY2Lq3W9/akUnsb/fxkCoUWYb4kwLgrwAIg6xbzFTsWNQSis3OrAI/rBVjEoedGqe2ZQghwUDN/9AUx24APduxMIEyx2BoEYh6MKRZbw0KUSmttCASD4Nl18yzomrELOzSEnoO5HC7F/kV2qgNEJpn3eAex74msIPTcernpFcIotUGAn1mDCDBu7+0NpLbtcH8A5oowD+gkOWJ6etbbZo+FedBeSzVWknR7A7H7oxTh8EmAQ0tOShS12T4pJuWGNxC7AXR2YhmI+TCuzggw5BPkiyPIgPOYwDXHMUf9gQDiFApxfNh1TA20u7pM3kAcwyBNhrF9HUNrwifIZ+8ghcImR0dGvIFo4F2jQksDb32C3HecvUHfi10z3/UGYjdwzuk3itqc0q9jAhHgoj+QJOlO9UJcBibtC7ECdHkDMUptE+CX683tbFdDB2i3CaCaoeL4qD3nnMq56vCUTQrkU5r5jbMrnpowP6FmLqr0XJie8w5SYd6fsRu/J5h3Uwhp4HWGII+CQFRBmE9lCHI8GEitUvyeAcSI6e1dQyElzFczcOQChVYZ2JW2XE3lBvDDRNFmykK2/AwI0k9ZqazUzhDfuAT4ZpTaQlnKbuYCOHKaspZRap3Xj9nA++CZailJkpR8gUzFcSc1Sqavb6VmfuVhbTykRktmiiRdNwRzucK8j/Igcawgl2hnKC8yhUKL/UhQhxvDRqlVlCdpoF2A6RQQFUmSA5RHCdCfwpGzlFeZjo7VAjx1yFIPbMajPKs8s6n8ukxIjdrfeNQMqsRxZEvVRZyYngKOUTNJM/ctsg05T80mQ7RCA3fmgdyz56gZZWZK4yFhfuH1pyb9w/oD8BlGPlZ8YpwAAAAASUVORK5CYII="/>
        </div>


};

function createMapOptions(maps: any) {
    // next props are exposed at maps
    // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
    // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
    // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
    // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
    // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
    return {
      zoomControlOptions: {
        position: maps.ControlPosition.RIGHT_CENTER,
        style: maps.ZoomControlStyle.SMALL
      },
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT
      },
      mapTypeControl: true
    };
  }

  return (
    <div  
        style={{
            fontWeight: 300
        }} 
    >
        <Title 
                level={5}
                title='Customer Images'
        />
        <div className='grid grid-cols-4 gap-8 pt-2 items-center'>
        {imageDetails.data?.map((image: any, index: any) => {
                return <div 
                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded'
                    key={index}
                >
                    <ImageDisplay
                        key={index}
                        hashValue={image.hashIdentifier}
                        data={image}
                    />
                    <h4>{image.imgOriginalName}</h4>
                </div>
        })}
        {imageDetails.data
        ?.filter((row: any) => {
            return row.imgSubCategory == "SIGN"
        })
        ?.map((image: any, index: any) => {
                return <div 
                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded overflow-hidden'
                    key={index}
                >
                    {/* <div 
                    // style={{ height: '400px', width: '400px' }}
                    > */}
                    {/* <GoogleMapReact
                            bootstrapURLKeys={{ key: import.meta.env.REACT_APP_GOOGLE_MAP_API_KEY }}
                            defaultCenter={{
                                lat: 6.89147314241435,
                                lng: 79.87585501722411
                            }}
                            defaultZoom={7}
                            options={createMapOptions}
                        > */}
                            {/* {locations.length > 0 && locations.map((l, i) =>  */}
                            {/* <AnyReactComponent
                                lat={6.89147314241435}
                                lng={79.87585501722411}
                                text="My Marker"
                            /> */}
                            {/* // )} */}
                        {/* </GoogleMapReact> */}
                    {/* </div> */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        position:'relative',
                    }}>
                        <Google
                            lat = { 6.89147314241435}
                            lng={79.87585501722411}
                        />
                    </div>
                    <h4>{image.imgOriginalName}</h4>
                </div>
        })}
        {/* <div style={{
            width: '400px',
            height: '400px',
            position: 'relative'
        }}>
            <Google

            />
        </div> */}
        {/* <ImageZoom/> */}
        </div>
    </div>
  );
}
