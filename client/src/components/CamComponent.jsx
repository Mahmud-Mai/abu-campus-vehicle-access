import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const CamComponent = ({ webcamRef, videoConstraints }) => {
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsStreaming(true);
    }, 1500);
  }, []);

  return (
    <>
      {isStreaming ? (
        <Webcam
          audio={false}
          height={400}
          ref={webcamRef}
          margin={'auto'}
          width={400}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      ) : (
        <Flex align={'center'} height={200}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      )}
    </>
  );
};

export default CamComponent;
