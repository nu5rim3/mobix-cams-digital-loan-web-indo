import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import ImageDisplay from '../../../../components/Image/ImageViewerByHash';
import { Grid } from 'antd';

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

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint()
    

  return (
    <div  
    style={{
        // fontWeight: 300
    }} 
    className={
        screens.xs
        ? 'flex flex-col'
        : 'flex'
    }
    >
        <div className='text-justify flex flex-col justify-center  p-10'>
            {/* <p>I {customerData?.data?.fullName},</p> */}
            {/* <br/> */}
            <p className='-l-10'>Saya / kami dengan ini menyatakan bahwa informasi di atas adalah benar dan dengan ini saya / kami memohon pembiayaan dengan jumlah yang tersebut di atas untuk memenuhi maksud dan tujuan permohonan pembiayaan. Saya menyetujui data dan informasi tersebut diatas didaftarkan pada SLIK OJK, dan saya setuju / tidak setuju* data saya diberikan kepada pihak ketiga untuk tujuan komersial atau untuk tujuan lain yang dinilai wajar dan diperlukan. Saya juga setuju untuk mengikuti seluruh ketentuan pembiayaan yang berlaku di PT LOLC Ventura Indonesia serta mematuhi kewajiban tanggung renteng.</p>

        </div>
        <div className='flex justify-center mx-12'>
            <div className=' flex flex-col justify-center items-center bg-gray-300 h-full p-1 rounded'>
                <ImageDisplay
                    hashValue={signImage?.hashIdentifier}
                    data={{

                    }}
                    key="signature"
                />
                <p>Customer Signature</p>
            </div>
        </div>
    </div>
  );
}
