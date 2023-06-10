import React from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
} from '@chakra-ui/react';

const CardComponent = props => {
  const { customStyles, title, children, btnAction, btnText } = props;

  return (
    <Card
      mx={'auto'}
      maxW="xl"
      variant={'elevated'}
      align={'center'}
      p={3}
      sx={customStyles}
    >
      <Heading as={'h2'} p={5}>
        {title}
      </Heading>
      <CardBody>{children}</CardBody>
      <CardFooter>
        <ButtonGroup>
          {btnText && <Button onClick={btnAction}>{btnText}</Button>}
          {props.props &&
            props.props.map(btn => (
              <Button key={btn.key} onClick={btn.btnAction || null}>
                {btn.btnText}
              </Button>
            ))}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
