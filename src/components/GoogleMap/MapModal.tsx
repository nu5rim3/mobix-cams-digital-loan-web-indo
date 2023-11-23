import * as React from 'react';
// import GoogleMapComponent from './Google'
import { Modal } from 'antd';
import GoogleVis from './GoogleVis';

export interface IMapModalProps {
  open: boolean,
  setOpen: Function,
  lat?: any,
  lng?: any
}

export default function MapModal ({
  open,
  setOpen,
  lat,
  lng,
}: IMapModalProps) {
  return (
    <Modal
      title="Google Map"
      open={open}
      // onOk={handleOk}
      onCancel={() => setOpen(false)}
      // okButtonProps={{ disabled: true }}
      // cancelButtonProps={{ disabled: true }}
      footer={false}
      width={1100}
    >
      {/* hellooo */}
      <div style={{
        width:'1050px',
        height:' 800px'
      }}>
        {/* <GoogleVis/> */}
      </div>
    </Modal>
  );
}
