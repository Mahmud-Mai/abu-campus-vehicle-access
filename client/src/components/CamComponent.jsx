import React from 'react';
import Webcam from 'react-webcam';

const CamComponent = ({ webcamRef, videoConstraints }) => {
  return (
    <>
      <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        width={400}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </>
  );
};

export default CamComponent;
