import { Grid, Box } from "@chakra-ui/core";

interface Iprops {
  errorMessage: string;
}

export const ErrorModal: React.FunctionComponent<Iprops> = ({ ...props }) => {
  return (
    <Grid
      gridTemplateColumns="100vw"
      gridTemplateRows="100vh"
      justifyItems="center"
      alignItems="center"
    >
      <Box
        mb="200px"
        fontSize="xl"
        fontWeight="bold"
        bg="tomato"
        w="300px"
        h="100px"
        p={4}
        color="white"
      >
        {props.errorMessage}
      </Box>
    </Grid>
  );
};
