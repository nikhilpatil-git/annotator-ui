import { Button, Tooltip } from "@chakra-ui/core";

interface IProps {
  isSolid: boolean;
  color: string;
  colorLight?: string;
  title?: string;
  onClickCallback: () => void;
}

export const CustomButton: React.FunctionComponent<IProps> = ({
  children,
  ...props
}) => {
  const primaryColor = "primary.green";
  const primaryLightColor = "primary.lightGreen";
  return (
    <Tooltip
      aria-label="Hey"
      label={props.title}
      placement="top"
      hidden={props.title ? false : true}
    >
      <Button
        title={props.title}
        _hover={{ bg: props.isSolid ? props.colorLight : "white" }}
        _active={{
          bg: props.isSolid ? props.color : "white",
        }}
        _focus={{
          outline: 0,
        }}
        outline={0}
        bg={props.isSolid ? props.color : "white"}
        color={props.isSolid ? "white" : props.color}
        border="1px"
        borderColor="white"
        onClick={() => props.onClickCallback()}
      >
        {children}
      </Button>
    </Tooltip>
  );
};
