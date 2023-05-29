import React from 'react';
import {
  Drawer,
  DrawerBody,
  // DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { navItems } from '../common/Constants';
import ListChildren from './ListChildren';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Flex align="center" justify="space-between" pt={'1.25rem'}>
            <DrawerCloseButton />
            <DrawerHeader fontSize={'4xl'}>SMARTGATE</DrawerHeader>
          </Flex>
          <DrawerBody>
            <Stack as="ul" textDecoration={'none'} spacing={'15px'} pt={'2rem'}>
              {navItems.map(({ text, icon, link }) => {
                return <ListChildren text={text} icon={icon} link={link} />;
              })}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
