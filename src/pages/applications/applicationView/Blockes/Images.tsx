import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { API } from '../../../../services/Services';
import ImageDisplay from '../../../../components/Image/ImageViewerByHash';
import Title from '../../../../components/Typography/Tytle';
import GoogleMapReact from 'google-map-react';
import Google from '../../../../components/GoogleMap/Google';
import ImageZoom from '../../../../test/ImageTest';
import { Spin } from 'antd';


export interface IImagesProps {
}


export default function Images (props: IImagesProps) {

    const {
        imageDetails
    } = useSelector((state: any) => state.Application)
    const [openMapModal, setOpenModal] = useState(false)

  return (
    <div  
        style={{
            fontWeight: 300
        }} 
    >
        {
            imageDetails.loading?
                <div className='w-full h-32 flex justify-center'>
                    <Spin/>
                </div>
            :
            <div>
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
                </div>
            </div>
        }
    </div>
  );
}
