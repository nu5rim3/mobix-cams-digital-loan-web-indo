// import React, {useEffect, useCallback, useRef, useState} from 'react';

// import LightGallery from 'lightgallery/react';

// // import styles
// import 'lightgallery/css/lightgallery.css';
// import 'lightgallery/css/lg-zoom.css';
// import 'lightgallery/css/lg-thumbnail.css';


// // If you want you can use SCSS instead of css
// // import 'lightgallery/scss/lightgallery.scss';
// // import 'lightgallery/scss/lg-zoom.scss';

// // import plugins if you need
// import lgThumbnail from 'lightgallery/plugins/thumbnail';
// import lgZoom from 'lightgallery/plugins/zoom';
// import lgRotate from 'lightgallery/plugins/rotate';
// import lgAutoPlay from 'lightgallery/plugins/autoplay';
// import lgShare from 'lightgallery/plugins/share';

import ime from './roses-took-pic-my-homegarden-black-white-100953466.webp'

// export interface IImageZoomProps {
// }

// export default function ImageZoom (props: IImageZoomProps) {
//     const onInit = () => {
//         console.log('lightGallery has been initialized');
//     };

//   return (
//     <div>
//        <LightGallery
//                 onInit={onInit}
//                 speed={500}
//                 plugins={[
//                     lgThumbnail, 
//                     lgZoom, 
//                     // lgRotate,
//                     // lgAutoPlay,
//                     // lgShare,

//                 ]}
//             >
//                 <a href={ime}>
//                     <img alt="img1" src={ime} />
//                 </a>
//                 <a href="https://media.istockphoto.com/id/1446885495/photo/happy-kiss-and-hug-on-mothers-day-in-living-room-sofa-love-and-relaxing-together-in-australia.jpg?s=1024x1024&w=is&k=20&c=mCUgF4Qxk3CxhaTRt-nTCnMWHntmmilns5bUYiRVvNo=">
//                     <img alt="img2" src="https://media.istockphoto.com/id/1446885495/photo/happy-kiss-and-hug-on-mothers-day-in-living-room-sofa-love-and-relaxing-together-in-australia.jpg?s=1024x1024&w=is&k=20&c=mCUgF4Qxk3CxhaTRt-nTCnMWHntmmilns5bUYiRVvNo=" />
//                 </a>
//                 ...
//             </LightGallery>
//     </div>
//   );

// const lightGallery = useRef<any>(null);
// const [items, setItems] = useState([
//     {
//         id: '1',
//         // size: '1400-800',
//         src: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729509_640.jpg',
//         thumb: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729509_640.jpg',
//     },
//     {
//         id: '2',
//         size: '1400-800',
//         src: ime,
//         thumb: ime,
//     },
// ]);

// const addItem = useCallback(() => {
//     setItems([
//         ...items,
//         {
//             id: '5',
//             size: '1400-800',
//             src: 'img-5.jpg',
//             thumb: 'thumb-5.jpg',
//         },
//         {
//             id: '6',
//             size: '1400-800',
//             src: 'img-6.jpg',
//             thumb: 'thumb-6.jpg',
//         },
//     ]);
// }, []);

// const onInit = useCallback((detail:any) => {
//     if (detail) {
//         lightGallery.current = detail.instance;
//     }
// }, []);

// const getItems = useCallback(() => {
//     return items.map((item) => {
//         return (
//             <div
//                 key={item.id}
//                 data-lg-size={item.size}
//                 className="gallery-item"
//                 data-src={item.src}
//             >
//                 <img className="img-responsive" src={item.thumb} />
//             </div>
//         );
//     });
// }, [items]);

// useEffect(() => {
//     lightGallery.current.refresh();
// }, [items]);

// return (
//     <div className="App">
//         <button onClick={addItem}>Add new item</button>
//         <LightGallery
//             plugins={[
//                 lgZoom
//             ]}
//             // elementClassNames="custom-class-name"
//             onInit={onInit}
//         >
//             {getItems()}
//         </LightGallery>
//     </div>
// );
// }

// import React, { Component } from "react";

// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// const Example = () => {
//   return (
//     <TransformWrapper>
//       <TransformComponent>
//         <img src={ime} alt="test" />
//       </TransformComponent>
//     </TransformWrapper>
//   );
// };

// import React, { Component } from "react";

// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// const Example = () => {
//   return (
//     <TransformWrapper
//       initialScale={1}
//       initialPositionX={200}
//       initialPositionY={100}
//     >
//       {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
//         <React.Fragment>
//           <div className="tools">
//             <button onClick={() => zoomIn()}>+</button>
//             <button onClick={() => zoomOut()}>-</button>
//             <button onClick={() => resetTransform()}>x</button>
//           </div>
//           <TransformComponent>
//             <img src={ime} alt="test" />
//             <div>Example text</div>
//           </TransformComponent>
//         </React.Fragment>
//       )}
//     </TransformWrapper>
//   );
// };

// export default Example

// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css'; 

// import * as React from 'react';

// export interface IExampleProps {
// }

import Lightbox from 'react-awesome-lightbox';
// You need to import the CSS only once
import "react-awesome-lightbox/build/style.css";

export default function Example (props: any) {
  return (
    <Lightbox image="https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729509_640.jpg" title="Image Title"/>
  )
}

