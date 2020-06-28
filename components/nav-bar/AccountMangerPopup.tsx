import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Link,
  Stack,
  Text,
  Button,
} from "@chakra-ui/core";
import React, { useEffect, useContext } from "react";
import { FiLogOut } from "react-icons/fi";

interface Iprops {
  handleSignOut: () => void;
  togglePopup: boolean;
}

export const AccountMangerPopup: React.FunctionComponent<Iprops> = ({
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (props.togglePopup) {
      setIsOpen(() => true);
    } else {
      setIsOpen(() => false);
    }
  }, [props.togglePopup]);

  return (
    <Popover
      returnFocusOnClose={false}
      placement="bottom"
      closeOnBlur={true}
      isOpen={isOpen}
      onClose={close}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader>
          <Stack>
            <Text textAlign="center">Welcome, Nikhil!</Text>
            <Text textAlign="center">This is your Google account</Text>
          </Stack>
        </PopoverHeader>
        <PopoverBody>
          <Stack justifyContent="center">
            <Button
              onClick={props.handleSignOut}
              rightIcon={FiLogOut}
              variantColor="blue"
              variant="outline"
            >
              Logout
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
