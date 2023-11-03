import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import ImageDisplay from '../../../../components/Image/ImageViewerByHash';

export interface IAchnowledgementProps {
}

export default function Achnowledgement (props: IAchnowledgementProps) {
    const {
        customerData
    } = useSelector((state: any) => state.Application)

    const {
        imageDetails
    } = useSelector((state: any) => state.Application)

    
    const signImage = imageDetails.data?.find((row: any) => {
        return row.imgSubCategory == "SIGN"
    })
    

  return (
    <div  
    style={{
        // fontWeight: 300
    }} 
    className='grid grid-cols-2 gap-0 '
    >
        <div className='text-justify flex flex-col justify-center'>
            <p>I {customerData?.data?.fullName},</p>
            <br/>
            <p>Accept the all conditions and terms hereby mentioned by the {customerData?.data?.groupIdx} for the loan application {customerData?.data?.appraisalId} and agree to repay the according to the agreement.</p>

        </div>
        <div className='flex justify-center '>
            <div className=' flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded'>
                <ImageDisplay
                    hashValue={signImage?.hashIdentifier}
                    data={{

                    }}
                />
                <p>Customer Signature</p>
            </div>
        </div>
    </div>
  );
}
