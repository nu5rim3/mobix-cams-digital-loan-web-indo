
// import { Modal } from "antd";
// import React, { Component, useState } from "react";

// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import {
//     FullscreenExitOutlined,
//     ZoomOutOutlined,
//     ZoomInOutlined,
//   } from '@ant-design/icons';

// const ImageModal = ({
//     src,
//     open,
//     setOpen
// }: {
//     src: string,
//     open: boolean,
//     setOpen: any
// }) => {

//     // const [open, setOpen] = useState(true)
    
//     const showModal = () => {
//       setOpen(true);
//     };
  
//     const handleOk = (e: React.MouseEvent<HTMLElement>) => {
//       console.log(e);
//       setOpen(false);
//     };
  
//     const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
//       console.log("close", e);

//       setOpen(false);
//     };

//     console.log("yyy", open)
//   return (
//     <Modal
//         width={900}
//         className="w-50"
//         // visible={open}
//         title="Basic Modal"
//         open={open}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okButtonProps={{ hidden: true }}
//         cancelButtonProps={{ hidden: true }}
//     >
//         <TransformWrapper
//         initialScale={1}
//         // initialPositionX={200}
//         // initialPositionY={100}
//         >
//         {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
//             <React.Fragment>
//             <div className="tools bg-red-100 flex justify-end">
//                 <ZoomInOutlined style={{fontSize: 20}} onClick={() => zoomIn()} className="p-1"/>
//                 <ZoomOutOutlined style={{fontSize: 20}} onClick={() => zoomOut()} className="p-1"/>
//                 <FullscreenExitOutlined style={{fontSize: 20}} onClick={() => resetTransform()} className="p-1"/>
//             </div>
//             <TransformComponent>
//                 <div className="bg-green-100 w-full">
//                     <img src={src} alt="test" />
//                 </div>
//                 {/* <div>Example text</div> */}
//             </TransformComponent>
//             </React.Fragment>
//         )}
//         </TransformWrapper>
//     </Modal>
//   );
// };
import Lightbox from 'react-awesome-lightbox';
// You need to import the CSS only once
import "react-awesome-lightbox/build/style.css";

export default function ImageModal ({
  src,
  open,
  setOpen
}: {
  src: string,
  open: boolean,
  setOpen : any
}) {
  return (
    <Lightbox image={src} title="Image Title" onClose={() => setOpen(false)}/>
  )
}