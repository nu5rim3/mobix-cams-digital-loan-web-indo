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
                <div className='mb-4'>
                    <Title 
                            level={5}
                            title='Customer Images'
                    />
                    {imageDetails.data?.
                        filter((image:any) => image.imgMasterCategory === 'CLIENT_IDENTIFICATION').length?
                        <div className='grid grid-cols-4 gap-8 pt-2 items-center'>
                        {imageDetails.data?.
                            filter((image:any) => image.imgMasterCategory === 'CLIENT_IDENTIFICATION')?.
                            map((image: any, index: any) => {
                                return <div 
                                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded'
                                    key={index}
                                >
                                    <ImageDisplay
                                        key={index}
                                        hashValue={image.hashIdentifier}
                                        data={image}
                                    />
                                    <h4>
                                        {
                                            image.imgSubCategory === 'CUSTOMER_IMAGE'? 'Customer Image'
                                            : image.imgSubCategory === 'CUSTOMER_ID'? 'Customer ID'
                                            : image.imgSubCategory === 'FAMILY_CARD'? 'Family'
                                            : image.imgSubCategory
                                        }
                                    </h4>
                                </div>
                        })}
                        {/* {imageDetails.data
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
                        })} */}
                        </div>
                    :
                        <p className='p-1'> No Data Found</p>
                    }
                </div>

                {imageDetails.data?.
                        filter((image:any) => image.imgMasterCategory === 'SPOUSE_IMAGES').length
                ?
                    <div className='mb-4'>
                        <Title 
                                level={5}
                                title='Spouse Images'
                        />
                        <div className='grid grid-cols-4 gap-8 pt-2 items-center'>
                        {imageDetails.data?.
                            filter((image:any) => image.imgMasterCategory === 'SPOUSE_IMAGES')?.
                            map((image: any, index: any) => {
                                return <div 
                                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded'
                                    key={index}
                                >
                                    <ImageDisplay
                                        key={index}
                                        hashValue={image.hashIdentifier}
                                        data={image}
                                    />
                                     <h4>
                                        {
                                            image.imgSubCategory === 'SPOUSE_IMAGE'? 'Spouse Image'
                                            : image.imgSubCategory === 'SPOUSE_ID'? 'Spouse ID'
                                            : image.imgSubCategory
                                        }
                                    </h4>
                                </div>
                        })}
                        {/* {imageDetails.data
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
                        })} */}
                        </div>
                    </div>
                : null}

                <div className='mb-4'>
                    <Title 
                            level={5}
                            title='Residencial Images'
                    />
                    {imageDetails.data?.
                        filter((image:any) => image.imgMasterCategory === 'RESIDENCIAL_IMAGES')?.length
                    ?
                        <div className='grid grid-cols-4 gap-8 pt-2 items-center'>
                        {imageDetails.data?.
                            filter((image:any) => image.imgMasterCategory === 'RESIDENCIAL_IMAGES')?.
                            map((image: any, index: any) => {
                                return <div 
                                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded'
                                    key={index}
                                >
                                    <ImageDisplay
                                        key={index}
                                        hashValue={image.hashIdentifier}
                                        data={image}
                                    />
                                     <h4>
                                        {
                                            image.imgSubCategory === 'RESIDENCE_IMAGE'? 'Residence Image'
                                            : image.imgSubCategory === 'RESIDENCE_OWNERSHIP_PROOF'? 'Residence Ownership Proof'
                                            : image.imgSubCategory
                                        }
                                    </h4>
                                </div>
                        })}
                        {imageDetails.data
                        ?.filter((row: any) => {
                            return row.imgSubCategory == "RESIDENCE_LOCATION_TAGING"
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
                                            lat = {image.latitude}
                                            lng={image.longitude}
                                        />
                                    </div>
                                    <h4>Residence Location</h4>
                                </div>
                        })}
                        </div>
                    :
                        <p className='p-1'> No Data Found</p>
                    }
                </div>

                <div className='mb-4'>
                    <Title 
                            level={5}
                            title='Business Images'
                    />
                    {imageDetails.data?.
                        filter((image:any) => image.imgMasterCategory === 'BUSINESS_IMAGES')?.length?
                        <div className='grid grid-cols-4 gap-8 pt-2 items-center'>
                            {imageDetails.data?.
                                filter((image:any) => image.imgMasterCategory === 'BUSINESS_IMAGES')?.
                                map((image: any, index: any) => {
                                    return <div 
                                        className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded'
                                        key={index}
                                    >
                                        <ImageDisplay
                                            key={index}
                                            hashValue={image.hashIdentifier}
                                            data={image}
                                        />
                                         <h4>
                                            {
                                                image.imgSubCategory === 'BUSINESS_IMAGE'? 'Business Image'
                                                : image.imgSubCategory
                                            }
                                        </h4>
                                    </div>
                            })}
                            {imageDetails.data
                            ?.filter((row: any) => {
                                return row.imgSubCategory == "BUSINESS_LOCATION_TAGING"
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
                                                lat = {image.latitude}
                                                lng={image.longitude}
                                            />
                                        </div>
                                        <h4>Business Location</h4>
                                    </div>
                            })}
                        </div>
                    : 
                        <p className='p-1'> No Data Found</p>
                    }
                </div>

                {imageDetails.data?.
                    filter((image:any) => image.imgMasterCategory === 'GUARANTOR')?.length?
                    <div className='mb-4'>
                        <Title 
                                level={5}
                                title='Guarantor Images'
                        />
                        <div className='grid grid-cols-4 gap-8 pt-2 items-center'>
                        {imageDetails.data?.
                            filter((image:any) => image.imgMasterCategory === 'GUARANTOR')?.
                            map((image: any, index: any) => {
                                return <div 
                                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded'
                                    key={index}
                                >
                                    <ImageDisplay
                                        key={index}
                                        hashValue={image.hashIdentifier}
                                        data={image}
                                    />
                                    <h4>
                                        {
                                            image.imgSubCategory === 'GUARANTOR_ID'? 'Guarantor Id'
                                            : image.imgSubCategory === 'OTHER_GUARANTOR_IMAGES'? 'Other Guarantor Images'
                                            : image.imgSubCategory
                                        }
                                    </h4>
                                </div>
                        })}
                        {/* {imageDetails.data
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
                        })} */}
                        </div>
                    </div>
                :null}

                <div className='mb-4'>
                    <Title 
                            level={5}
                            title='Collateral Images'
                    />
                    {imageDetails.data?.
                        filter((image:any) => image.imgMasterCategory === 'COLLATERAL_IMAGES')?.length?
                        <div className='grid grid-cols-4 gap-8 pt-2 items-center'>
                        {imageDetails.data?.
                            filter((image:any) => image.imgMasterCategory === 'COLLATERAL_IMAGES')?.
                            map((image: any, index: any) => {
                                return <div 
                                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded'
                                    key={index}
                                >
                                    <ImageDisplay
                                        key={index}
                                        hashValue={image.hashIdentifier}
                                        data={image}
                                    />
                                    <h4>Collateral Image {index + 1}</h4>
                                </div>
                        })}
                        {/* {imageDetails.data
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
                        })} */}
                        </div>
                    :
                        <p className='p-1'> No Data Found</p>
                    }
                </div>

                {imageDetails.data?.
                        filter((image:any) => image.imgMasterCategory === 'OTHER_IMAGES')?.length?
                    <div className='mb-4'>
                        <Title 
                                level={5}
                                title='Other Images'
                        />
                        <div className='grid grid-cols-4 gap-8 pt-2 items-center'>
                        {imageDetails.data?.
                            filter((image:any) => image.imgMasterCategory === 'OTHER_IMAGES')?.        
                            map((image: any, index: any) => {
                                return <div 
                                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded'
                                    key={index}
                                >
                                    <ImageDisplay
                                        key={index}
                                        hashValue={image.hashIdentifier}
                                        data={image}
                                    />
                                    <h4>Other Image {index + 1}</h4>
                                </div>
                        })}
                        {/* {imageDetails.data
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
                        })} */}
                        </div>
                    </div>
                :null}

                {imageDetails.data?.
                        filter((image:any) => image.imgSubCategory === 'CA_LEVEL')?.length?
                    <div className='mb-4'>
                        <Title 
                                level={5}
                                title='CA Level Images'
                        />
                        <div className='grid grid-cols-4 gap-8 pt-2 items-center'>
                        {imageDetails.data?.
                            filter((image:any) => image.imgSubCategory === 'CA_LEVEL')?.        
                            map((image: any, index: any) => {
                                return <div 
                                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded'
                                    key={index}
                                >
                                    <ImageDisplay
                                        key={index}
                                        hashValue={image.hashIdentifier}
                                        data={image}
                                    />
                                    <h4>CA Level Image {index + 1}</h4>
                                </div>
                        })}
                        {/* {imageDetails.data
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
                        })} */}
                        </div>
                    </div>
                :null}

                {imageDetails.data?.
                        filter((image:any) => image.imgSubCategory === 'BM_LEVEL')?.length?
                    <div className='mb-4'>
                        <Title 
                                level={5}
                                title='CA Level Images'
                        />
                        <div className='grid grid-cols-4 gap-8 pt-2 items-center'>
                        {imageDetails.data?.
                            filter((image:any) => image.imgSubCategory === 'BM_LEVEL')?.        
                            map((image: any, index: any) => {
                                return <div 
                                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded'
                                    key={index}
                                >
                                    <ImageDisplay
                                        key={index}
                                        hashValue={image.hashIdentifier}
                                        data={image}
                                    />
                                    <h4>BM Level Image {index + 1}</h4>
                                </div>
                        })}
                        {/* {imageDetails.data
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
                        })} */}
                        </div>
                    </div>
                :null}
            </div>
        }
    </div>
  );
}
