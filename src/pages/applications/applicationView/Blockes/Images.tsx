import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { API } from '../../../../services/Services';
import ImageDisplay from '../../../../components/Image/ImageViewerByHash';
import Title from '../../../../components/Typography/Tytle';
import GoogleMapReact from 'google-map-react';
import Google from '../../../../components/GoogleMap/Google';
import ImageZoom from '../../../../test/ImageTest';
import { Grid, Spin } from 'antd';
import GoogleVis from '../../../../components/GoogleMap/GoogleVis';
import MapModal from '../../../../components/GoogleMap/MapModal';
import convertImageName from '../../../../utils/convertImageName';


export interface IImagesProps {
}


export default function Images (props: IImagesProps) {

    const {
        imageDetails
    } = useSelector((state: any) => state.Application)
    const [openMapModal, setOpenModal] = useState(false)

    const ImageViwingGrid = [
        {
            showNoData: true,
            title: 'Customer Images',
            imgMasterCategory: 'CLIENT_IDENTIFICATION',
            showLocations: true
        }
    ]

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint()

  return (
    <div  
        style={{
            fontWeight: 300
        }} 
    >
        <MapModal open={openMapModal} setOpen={setOpenModal}/>
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
                        <div className={
                            screens.xs
                            ? 'grid grid-cols-1 gap-8 pt-2 items-center'
                            : 'grid grid-cols-4 gap-8 pt-2 items-center'
                        }>
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
                                        {convertImageName(image.imgSubCategory)}
                                    </h4>
                                </div>
                        })}
                        
                        {
                            imageDetails.data
                            ?.find((row: any) => {
                                return (row.imgMasterCategory === 'CLIENT_IDENTIFICATION' && row.latitude && row.longitude)
                            }) ?
                                <div 
                                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded overflow-hidden'
                                    key={'customer_images_locations'}
                                    // onClick={() => {
                                    //     setOpenModal(true)
                                    // }}
                                >
                                    <div 
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            minHeight:'250px',
                                            position:'relative',
                                        }}
                                        
                                    >
                                        <GoogleVis locations={
                                            imageDetails.data
                                            ?.filter((row: any) => {
                                                return (row.imgMasterCategory === 'CLIENT_IDENTIFICATION' && row.latitude && row.longitude)
                                            })
                                        }/>
                                    </div>
                                    <h4 className='text-center'>Customer Data Captured Locations</h4>
                                </div>
                            : null
                        }
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
                        <div className={
                             screens.xs
                             ? 'grid grid-cols-1 gap-8 pt-2 items-center'
                             : 'grid grid-cols-4 gap-8 pt-2 items-center'
                            }>
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
                        {
                            imageDetails.data
                            ?.find((row: any) => {
                                return (row.imgMasterCategory === 'SPOUSE_IMAGES' && row.latitude && row.longitude)
                            }) ?
                                <div 
                                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded overflow-hidden'
                                    key={'SPOUSE_IMAGES'}
                                    // onClick={() => {
                                    //     setOpenModal(true)
                                    // }}
                                >
                                    <div 
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            minHeight:'250px',
                                            position:'relative',
                                        }}
                                        
                                    >
                                        <GoogleVis locations={
                                            imageDetails.data
                                            ?.filter((row: any) => {
                                                return (row.imgMasterCategory === 'SPOUSE_IMAGES' && row.latitude && row.longitude)
                                            })
                                        }/>
                                    </div>
                                    <h4 className='text-center'>Spouse Data Captured Locations</h4>
                                </div>
                            : null
                        }
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
                        <div className={
                            screens.xs
                             ? 'grid grid-cols-1 gap-8 pt-2 items-center'
                             : 'grid grid-cols-4 gap-8 pt-2 items-center'
                            }>
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
                                            : image.imgSubCategory === 'RESIDENCE_LOCATION_TAGGING'? 'Residence Location'
                                            : image.imgSubCategory
                                        }
                                    </h4>
                                </div>
                        })}
                        {
                            imageDetails.data
                            ?.find((row: any) => {
                                return (row.imgMasterCategory === 'RESIDENCIAL_IMAGES' && row.latitude && row.longitude)
                            }) ?
                                <div 
                                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded overflow-hidden'
                                    key={'RESIDENCIAL_IMAGES'}
                                    // onClick={() => {
                                    //     setOpenModal(true)
                                    // }}
                                >
                                    <div 
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            minHeight:'250px',
                                            position:'relative',
                                        }}
                                        
                                    >
                                        <GoogleVis locations={
                                            imageDetails.data
                                            ?.filter((row: any) => {
                                                return (row.imgMasterCategory === 'RESIDENCIAL_IMAGES' && row.latitude && row.longitude)
                                            })
                                        }/>
                                    </div>
                                    <h4 className='text-center'>Residential Data Captured Locations</h4>
                                </div>
                            : null
                        }
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
                        filter((image:any) => image.imgMasterCategory === 'BUSINESS_IMAGE')?.length?
                        <div className={
                            screens.xs
                             ? 'grid grid-cols-1 gap-8 pt-2 items-center'
                             : 'grid grid-cols-4 gap-8 pt-2 items-center'
                            }>
                            {imageDetails.data?.
                                filter((image:any) => image.imgMasterCategory === 'BUSINESS_IMAGE')?.
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
                                                    {
                            imageDetails.data
                            ?.find((row: any) => {
                                return (row.imgMasterCategory === 'BUSINESS_IMAGE' && row.latitude && row.longitude)
                            }) ?
                                <div 
                                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded overflow-hidden'
                                    key={'BUSINESS_IMAGE'}
                                    // onClick={() => {
                                    //     setOpenModal(true)
                                    // }}
                                >
                                    <div 
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            minHeight:'250px',
                                            position:'relative',
                                        }}
                                        
                                    >
                                        <GoogleVis locations={
                                            imageDetails.data
                                            ?.filter((row: any) => {
                                                return (row.imgMasterCategory === 'BUSINESS_IMAGE' && row.latitude && row.longitude)
                                            })
                                        }/>
                                    </div>
                                    <h4 className='text-center'>Business Data Captured Locations</h4>
                                </div>
                            : null
                        }
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
                        <div className={
                            screens.xs
                            ? 'grid grid-cols-1 gap-8 pt-2 items-center'
                            : 'grid grid-cols-4 gap-8 pt-2 items-center'
                            }>
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
                                                                            {
                            imageDetails.data
                            ?.find((row: any) => {
                                return (row.imgMasterCategory === 'GUARANTOR' && row.latitude && row.longitude)
                            }) ?
                                <div 
                                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded overflow-hidden'
                                    key={'GUARANTOR'}
                                    // onClick={() => {
                                    //     setOpenModal(true)
                                    // }}
                                >
                                    <div 
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            minHeight:'250px',
                                            position:'relative',
                                        }}
                                        
                                    >
                                        <GoogleVis locations={
                                            imageDetails.data
                                            ?.filter((row: any) => {
                                                return (row.imgMasterCategory === 'GUARANTOR' && row.latitude && row.longitude)
                                            })
                                        }/>
                                    </div>
                                    <h4 className='text-center'>Guarantor Data Captured Locations</h4>
                                </div>
                            : null
                        }
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
                        <div className={
                            screens.xs
                             ? 'grid grid-cols-1 gap-8 pt-2 items-center'
                             : 'grid grid-cols-4 gap-8 pt-2 items-center'
                            }>
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
                           {
                            imageDetails.data
                            ?.find((row: any) => {
                                return (row.imgMasterCategory === 'COLLATERAL_IMAGES' && row.latitude && row.longitude)
                            }) ?
                                <div 
                                    className='flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded overflow-hidden'
                                    key={'GUARANTOR'}
                                    // onClick={() => {
                                    //     setOpenModal(true)
                                    // }}
                                >
                                    <div 
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            minHeight:'250px',
                                            position:'relative',
                                        }}
                                        
                                    >
                                        <GoogleVis locations={
                                            imageDetails.data
                                            ?.filter((row: any) => {
                                                return (row.imgMasterCategory === 'COLLATERAL_IMAGES' && row.latitude && row.longitude)
                                            })
                                        }/>
                                    </div>
                                    <h4 className='text-center'>Collateral Data Captured Locations</h4>
                                </div>
                            : null
                        }
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
                        </div>
                    </div>
                :null}

                {imageDetails.data?.
                        filter((image:any) => image.imgSubCategory === 'CA_LEVEL')?.length?
                    <div className='mb-4'>
                        <Title 
                                level={5}
                                title='Credit Analyst Attached Images'
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
                        </div>
                    </div>
                :null}

                {imageDetails.data?.
                        filter((image:any) => image.imgSubCategory === 'BM_LEVEL')?.length?
                    <div className='mb-4'>
                        <Title 
                                level={5}
                                title='Branch Manager Attached Images'
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
                        </div>
                    </div>
                :null}
            </div>
        }
    </div>
  );
}
