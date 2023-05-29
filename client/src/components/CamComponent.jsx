import React, { useState, useRef } from 'react';
import { Camera } from 'react-camera-pro';

const CamComponent = () => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  return (
    <div>
      <Camera ref={camera} />
      <button onClick={() => setImage(camera.current.takePhoto())}>
        Take a photo
      </button>
      <img src={image} alt="plate number" />
    </div>
  );
};

export default CamComponent;
