import React from 'react';
import {
  //   Box,
  Button,
  ButtonGroup,
  //   ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
} from '@chakra-ui/react';

const CardComponent = props => {
  return (
    <Card mx={'auto'} maxW="xl" variant={'elevated'} align={'center'} p={5}>
      <Heading as={'h2'}>{props.title}</Heading>
      <CardBody>{props.children}</CardBody>
      <CardFooter>
        <ButtonGroup>
          {props.btnText ? (
            <Button onClick={props.btnAction}>{props.btnText}</Button>
          ) : (
            props.props.map(btn => (
              <Button key={btn.key} onClick={btn.btnAction || null}>
                {btn.btnText}
              </Button>
            ))
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
