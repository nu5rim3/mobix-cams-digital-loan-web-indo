import Dragger from 'antd/es/upload/Dragger';
import React, {useState} from 'react';
import { InboxOutlined , PlusOutlined} from '@ant-design/icons';
import { Modal, UploadFile, UploadProps, message, Upload, Button } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useSelector } from 'react-redux';
import { actions } from '../../../../store/store';
import WebcamCapture from '../../../../components/Camera/CapturePhoto';
import {CameraOutlined} from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid';
import fileToBase64Async from '../../../../utils/fileToBase64Async';

export interface IImageUploadProps {
    fileList?: any,
    setFileList: any
}


  const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function ImageUpload ({
    fileList,
    setFileList
}: IImageUploadProps) {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [openCamera, setOpenCamera] = useState<boolean>(false)

    const uploadProps: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
          },
        beforeUpload: (file) => {
            const pdfBlob = new Blob([file], { type: file.type });
            // Create a Blob URL
            const pdfUrl = URL.createObjectURL(pdfBlob);
            const obj = {
                uid: file.uid,
                name: file.name,
                type: file.type,
                originFileObj : file,
                url: pdfUrl
            }
            setFileList([...fileList, obj]);
      
            return false;
          },
        fileList : fileList.filter((file:any) => {
            return file.type == 'application/pdf' || 
            file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        }),
        onPreview: (file) => {
            if(file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
                const downloadLink:any = document.createElement('a');
                downloadLink.href = file.originFileObj;
                downloadLink.download = file.name;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
            if(file.type == 'application/pdf'){
                // const pdfBlob = new Blob([file.originFileObj], { type: 'application/pdf' });
                const newWindow:any = window.open(file.url, '_blank');
                newWindow.focus();
            }
        },
        disabled: fileList.length >= 5? true : false 
      };

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as RcFile);
        }

        const url:any = (file.preview as string) || file?.url
    
        setPreviewImage(url);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
      };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>{
        setFileList(newFileList);
        // actions.updateApplicationFileUpload(newFileList)
    }

    const captureImage = async (image: any) => {
        const blob = new Blob([image], { type: 'image/jpeg' });
        const name = uuidv4()

        const file = new File([blob], `${name}.${'image/jpeg'}`, { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(file);

        const base64 = await fileToBase64Async(file);

        const imageGen = {
            uid: uuidv4(),
            name: name,
            type: "image/jpeg",
            originFileObj : file,
            url: imageUrl,
            preview: base64,
            thumbUrl: image
        }

        return setFileList((pre:any) => ([...pre, imageGen]));
    }

    const uploadButton = (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

  return (
    <div className='grid grid-cols-2 gap-5 pt-2'>
        <div>
            <div className=''>
                <WebcamCapture open={openCamera} setOpen={setOpenCamera} onCapture={captureImage}/>

                <Button className='w-full mb-2' icon={<CameraOutlined />} onClick={() => setOpenCamera(true)}>Capture Image</Button>

                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                    </p>
                </Dragger>

            </div>
            
        </div>
        <div>
        <>
            <Upload
                listType="picture-card"
                fileList={fileList.filter((file:any) => {
                    return file.type == 'image/jpeg' || file.type == 'image/png'
                })}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {/* {fileList.length >= 8 ? null : uploadButton} */}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
        </div>

    </div>

  );
}
