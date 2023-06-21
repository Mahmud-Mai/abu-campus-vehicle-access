import React from 'react';
import CardComponent from '../../components/CardComponent';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

const PreviewPlateNumber = ({
  btnArray,
  children,
  generateRandomPlateNumber,
  plateNumber,
  isPlateNumberValid,
  plateNumberImage,
}) => {
  // Section to Preview image of plate number
  let plateNumberImageBox;
  if (plateNumberImage) {
    plateNumberImageBox = (
      <img
        sx={{ width: '250px', height: '300px' }}
        src={plateNumberImage}
        alt="plate number img"
      />
    );
  } else {
    <Flex
      sx={{
        width: '500px',
        height: '300px',
        border: '2px solid #f3f3f3',
      }}
      mx="auto"
      align="center"
      justify="center"
    >
      PLEASE SNAP A PLATE NUMBER!!
    </Flex>;
  }

  return (
    <CardComponent title={'PREVIEW PLATE NUMBER'} props={btnArray}>
      <Box>{plateNumberImageBox}</Box>
      {/* Text box to display the recognized characters from the picture provided   */}
      <Text m={3}>
        {isPlateNumberValid
          ? `Recognized Plate Number: ${plateNumber}`
          : `Valid Nigerian Plate Number not detected`}
      </Text>
      {/* Other Child Items */}
      {children}

      {/* Button To generate a dummy plate number for demonstration */}
      <Button mt={3} onClick={generateRandomPlateNumber}>
        Generate Random Plate Number
      </Button>
    </CardComponent>
  );
};

export default PreviewPlateNumber;
