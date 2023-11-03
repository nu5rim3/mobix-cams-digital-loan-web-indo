import React, { useEffect, useState } from 'react';
import { API } from '../../services/Services';
import ImageModal from './ImageModal';
import { Image, Space } from 'antd';
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';


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

  const onDownload = () => {
    imageUrl?
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      })
    : null
  };

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
      {/* <div className='h-52 w-52 flex items-center justify-center cursor-pointer'>
        <Image
          width={200}
          src={imageUrl}
          preview={{
            toolbarRender: (
              _,
              {
                transform: { scale },
                actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
              },
            ) => (
              <Space size={40} className="toolbar-wrapper">
                <DownloadOutlined onClick={onDownload} style={{fontSize:'30px'}}/>
                <SwapOutlined rotate={90} onClick={onFlipY} />
                <SwapOutlined onClick={onFlipX} />
                <RotateLeftOutlined onClick={onRotateLeft} />
                <RotateRightOutlined onClick={onRotateRight} />
                <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
              </Space>
            ),
          }}
        />
      </div> */}
    </>
    : null
  );
};

export default ImageDisplay;