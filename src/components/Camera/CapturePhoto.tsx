import { Button, Modal } from 'antd';
import * as React from 'react';
import Webcam from "react-webcam";
import { CameraOutlined } from '@ant-design/icons'

const WebcamCapture = ({
  open,
  setOpen,
  onCapture
}: {
    open: boolean,
    setOpen: Function,
    onCapture: Function
  }) => {

  const webcamRef: any = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef ?.current ?.getScreenshot();
    console.log("cure", webcamRef ?.current)
    const imageSrc1 = webcamRef ?.current
      // setImgSrc(imageSrc);
      onCapture(imageSrc)
    setOpen(false)
  }, [webcamRef, setImgSrc]);

  const videoConstraints = {
    width: { min: 480 },
    height: { min: 720 },
    facingMode: "user",
  };

  return (
    <Modal
      title="Capture Photo"
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
      width={700}
      centered
    >
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg" 
        />
        <Button icon={<CameraOutlined />} className='w-full mt-3' onClick={capture} type='primary'>CAPTURE PHOTO</Button>
        {/* {imgSrc && (
          <img
            src={imgSrc}
          />
        )} */}
      </>
    </Modal>
  );
};

export default WebcamCapture