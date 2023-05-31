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
import { BiMenu } from 'react-icons/bi';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(true);
  const btnRef = React.useRef();

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        bg={'none'}
        sx={{ position: 'absolute', left: 5, top: 2 }}
      >
        <BiMenu size="lg" />
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
                return (
                  <ListChildren
                    key={text}
                    text={text}
                    icon={icon}
                    link={link}
                  />
                );
              })}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
