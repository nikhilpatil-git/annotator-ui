import {
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  Icon,
  DrawerFooter,
  Box,
} from "@chakra-ui/core";
import React from "react";
import { TiThMenu } from "react-icons/ti";

export const NavDrawer = () => {
  const btnRef = React.createRef<HTMLButtonElement>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box as={TiThMenu} size="32px" onClick={onOpen} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button color="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
