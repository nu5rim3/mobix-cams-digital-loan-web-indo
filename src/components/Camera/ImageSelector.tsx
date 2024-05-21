// src/components/ImageSelector.tsx
import { Button } from 'antd';
import React, { useState, ChangeEvent } from 'react';
import { PictureOutlined } from '@ant-design/icons'

interface IImageSelector {
    onCapture: Function
}

const ImageSelector: React.FC<IImageSelector> = ({ onCapture }) => {

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                onCapture(reader?.result)
            }
        }
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput')?.click();
    };

    return (
        <div>
            <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} className='hidden' />
            <Button onClick={handleButtonClick} type='primary' icon={<PictureOutlined />} className='w-60'>Upload from Gallary</Button>
        </div>
    );
};

export default ImageSelector;
