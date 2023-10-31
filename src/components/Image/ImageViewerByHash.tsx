import React, { useEffect, useState } from 'react';
import { API } from '../../services/Services';
import ImageModal from './ImageModal';

interface ImageDisplayProps {
  hashValue: string;
  data: any
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ hashValue, data}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false)

  const getImage = async () => {
    try{
        const response = await API.documentServices.viewDocumentByHash(hashValue)
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
    }catch(err){
        console.log("err",err)
    }
  }

  useEffect(() => {
    if(hashValue) getImage()
  }, [hashValue]);

  return (
    imageUrl?
    <>
      <div className='h-52 w-52 flex items-center justify-center cursor-pointer' onClick={() => {
        setOpen(true)
      }}>
          <img 
              src={imageUrl} 
              alt="Image" 
              className='max-w-full max-h-full'
          />
      </div>
      {open?
        <ImageModal 
          src={imageUrl} 
          open={open} 
          setOpen={setOpen} 
          key={imageUrl}
        />
      : null}
    </>
    : null
  );
};

export default ImageDisplay;