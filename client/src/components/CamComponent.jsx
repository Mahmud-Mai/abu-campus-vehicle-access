import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

// const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'environment',
};

const CamComponent = () => {
  const [picture, setPicture] = useState('');
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  }, [webcamRef]);

  return (
    <div>
      <h2>React Photo Capture using Webcam Examle</h2>
      <div>
        {picture == '' ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} />
        )}
      </div>
      <div>
        {picture != '' ? (
          <button
            onClick={e => {
              e.preventDefault();
              setPicture();
            }}
          >
            Retake
          </button>
        ) : (
          <button
            onClick={e => {
              e.preventDefault();
              capture();
            }}
          >
            Capture
          </button>
        )}
      </div>
    </div>
  );
};
export default CamComponent;
