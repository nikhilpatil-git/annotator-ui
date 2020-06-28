import { Grid, Box, Text } from "@chakra-ui/core";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GoMarkGithub } from "react-icons/go";

type IProps = {
  bgColor: string;
};

const CommonGrid: React.FunctionComponent<IProps> = ({ bgColor, children }) => {
  return (
    <Grid
      borderRadius={5}
      alignItems="center"
      justifyItems="center"
      bg={bgColor}
      w="250px"
      h="50px"
      templateColumns={"50px 200px"}
    >
      {children}
    </Grid>
  );
};

export const LoginWithGoogle = () => {
  return (
    <CommonGrid bgColor="#4285f4">
      <Box p={2} bg="white" as={FcGoogle} size="44px" color="green.400" />
      <Text color="white" fontSize="lg">
        Google
      </Text>
    </CommonGrid>
  );
};

export const LoginWithFacebook = () => {
  return (
    <CommonGrid bgColor="#1877f2">
      <Box p={2} as={FaFacebook} size="48px" color="white" />
      <Text color="white" fontSize="lg">
        Facebook
      </Text>
    </CommonGrid>
  );
};

export const LoginWithGithub = () => {
  return (
    <CommonGrid bgColor="#252525">
      <Box p={2} as={GoMarkGithub} size="48px" color="white" />
      <Text color="white" fontSize="lg">
        Github
      </Text>
    </CommonGrid>
  );
};
