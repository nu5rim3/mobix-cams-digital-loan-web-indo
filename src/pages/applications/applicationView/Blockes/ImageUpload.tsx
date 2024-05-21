import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, UploadFile, UploadProps, message, Upload, Button, Grid } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useSelector } from 'react-redux';
import WebcamCapture from '../../../../components/Camera/CapturePhoto';
import ImageSelector from '../../../../components/Camera/ImageSelector';
import { CameraOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid';

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

export default function ImageUpload({
  fileList,
  setFileList
}: IImageUploadProps) {

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const { selectedRole } = useSelector((state: any) => state.AppData)

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
        originFileObj: file,
        url: pdfUrl
      }
      setFileList([...fileList, obj]);

      return false;
    },
    fileList: fileList.filter((file: any) => {
      return file.type == 'application/pdf' ||
        file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }),
    onPreview: (file) => {
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const downloadLink: any = document.createElement('a');
        downloadLink.href = file.originFileObj;
        downloadLink.download = file.name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
      if (file.type == 'application/pdf') {
        // const pdfBlob = new Blob([file.originFileObj], { type: 'application/pdf' });
        const newWindow: any = window.open(file.url, '_blank');
        newWindow.focus();
      }
    },
    disabled: fileList.length >= 5 ? true : false
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    const url: any = (file.preview as string) || file?.url

    setPreviewImage(url);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // actions.updateApplicationFileUpload(newFileList)
  }

  const dataURLtoBlob = (dataURL: any) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const captureImage = async (image: any) => {
    const name = `${uuidv4()}.jpeg`
    const blob = dataURLtoBlob(image);

    // Create a File object from the Blob
    const file = new File([blob], name, { type: 'image/jpeg' });

    const pdfUrl = URL.createObjectURL(blob);

    const imageGen = {
      uid: uuidv4(),
      name: name,
      type: "image/jpeg",
      originFileObj: file,
      url: pdfUrl,
      // preview: image,
      thumbUrl: image
    }

    return setFileList((pre: any) => ([...pre, imageGen]));
  }

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint()

  return (
    <div className={
      screens.xs
        ? 'grid grid-cols-1 gap-5 pt-2'
        : 'grid grid-cols-2 gap-5 pt-2'
    }>
      <div>
        <div className=''>
          <WebcamCapture open={openCamera} setOpen={setOpenCamera} onCapture={captureImage} />

          <Button className='w-60 mb-2' icon={<CameraOutlined />} onClick={() => setOpenCamera(true)}>Capture Image</Button>
          {
            selectedRole === 'BM' && (
              <ImageSelector onCapture={captureImage} />
            )
          }

          {/* section for drag ad drop */}

          {/* <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                    </p>
                </Dragger> */}

        </div>

      </div>
      <div>
        <>
          <Upload
            listType="picture-card"
            fileList={fileList.filter((file: any) => {
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
