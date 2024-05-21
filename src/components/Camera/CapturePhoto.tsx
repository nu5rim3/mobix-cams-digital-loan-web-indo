import { Button, Modal } from 'antd';
import * as React from 'react';
import Webcam from "react-webcam";
import { CameraOutlined, RotateRightOutlined } from '@ant-design/icons'

interface VideoConstraints {
  width: { min: number };
  height: { min: number };
  facingMode: string | { exact: string };
}

const WebcamCapture = ({
  open,
  setOpen,
  onCapture
}: {
    open: boolean,
    setOpen: Function,
    onCapture: Function
  }) => {
  const [toggle, setToggle] = React.useState<boolean>(false)
  const webcamRef: any = React.useRef(null);
  const [videoConstraints, setVideoConstraints] = React.useState<VideoConstraints>({
    width: { min: 380 },
    height: { min: 400 },
    facingMode: "user",
  });

  const toggleCamera = () => {
    setVideoConstraints((prevConstraints) => ({
      ...prevConstraints,
      facingMode: toggle ? { exact: "environment" } : "user",
    }));
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef ?.current ?.getScreenshot();
    onCapture(imageSrc)
    setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);

  React.useEffect(() => {
    toggleCamera()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle])


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
          videoConstraints={videoConstraints}
        />
        <div className='flex justify-between mt-3'>
          <Button icon={<RotateRightOutlined />} className='block lg:hidden w-1/3 mr-2' onClick={() => setToggle(!toggle)} type='default'>TOGGLE</Button>
          <Button icon={<CameraOutlined />} className='w-2/3 sm:w-full' onClick={capture} type='primary'>CAPTURE PHOTO</Button>
        </div>
      </>
    </Modal>
  );
};

export default WebcamCapture