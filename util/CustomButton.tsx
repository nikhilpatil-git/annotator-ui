import { Button } from "@chakra-ui/core";

interface IProps {
  isSolid: boolean;
}

export const CustomButton: React.FunctionComponent<IProps> = ({
  children,
  ...props
}) => {
  const primaryColor = "primary.green";
  const primaryLightColor = "primary.lightGreen";
  return (
    <Button
      _hover={{ bg: props.isSolid ? primaryLightColor : "white" }}
      _active={{
        bg: props.isSolid ? primaryColor : "white",
      }}
      _focus={{
        outline: 0,
      }}
      outline={0}
      bg={props.isSolid ? primaryColor : "white"}
      color={props.isSolid ? "white" : primaryColor}
      border="1px"
      borderColor="white"
    >
      {children}
    </Button>
  );
};
