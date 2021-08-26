import React, { useState, useEffect } from 'react';

//loader 
import Loader from './Loader';

interface IProps {
  src: string;
  className: string;
  width?: string;
  height?: string;
  alt?: string;
}

const ImgLoader: React.FC<IProps> = ({ ...props }) => {

  const [loader, setLoader] = useState(false);

  // const  toDataURL = (url, callback) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.onload = function() {
  //     const reader = new FileReader();
  //     reader.onloadend = function() {
  //       callback(reader.result);
  //     }
  //     reader.readAsDataURL(xhr.response);
  //   };
  //   xhr.open('GET', url);
  //   // xhr.setRequestHeader('Content-Type', 'data:image/jpeg;base64');

  //   xhr.responseType = 'blob';
  //   xhr.send();
  // }

  // const getBase64FromUrl = async (url) => {
  //   const data = await fetch(url, {
  //     mode: "no-cors",
  //   })
  //   const blob = await data.blob();
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(blob); 
  //     reader.onloadend = () => {
  //       const base64data = reader.result; 
  //       resolve(base64data);
  //     }
  //   });
  // }

  // let src:any = '' 
  // getBase64FromUrl(props.src).then(url => {
  //   src = url,
  //   setLoader(false)
  // });

  // toDataURL(props.src, (dataUrl) => {
  //   src = dataUrl;
  //   setLoader(false);
  // })

  return (
    <>
        {loader ? <Loader isSmall={true}/> :<img className={props.className} alt={'img'} src={props.src} />}
    </>
  );
};

export default ImgLoader;
