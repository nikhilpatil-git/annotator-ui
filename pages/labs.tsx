import { Grid, Box, Text } from "@chakra-ui/core";

const Banner = () => {
  return (
    <Box bg="primary.green" w="100%" p={4} color="white">
      <Text textAlign="center" fontSize="3xl">
        Crack Any Data Science Interview
      </Text>
    </Box>
  );
};

const LabsGrid = () => {
  return (
    <Grid templateColumns={["auto", "auto", "30% 70%", "30% 70%"]}>
      <Text
        display={["none", "none", "block", "block"]}
        bg="grey"
        textAlign="center"
        fontSize="xl"
      >
        One
      </Text>
      <Text bg="blue.500" textAlign="center" fontSize="xl">
        Two
      </Text>
    </Grid>
  );
};

const Labs = () => {
  return (
    <Grid w="full" templateRows={"100px auto"}>
      <Banner />
      <LabsGrid />
    </Grid>
  );
};

export default Labs;
