import { Grid, Box, Text } from "@chakra-ui/core";

export const LabBanner = () => {
  return (
    <Grid
      bg="#303a4e"
      boxShadow="5px 5px 10px rgba(0,0,0,0.5)"
      borderRadius={4}
      justifyItems="center"
      alignItems="center"
      p={5}
    >
      <Box h="full" color="white">
        <Text alignItems="center" textAlign="center" fontSize="3xl">
          Crack Any Data Science Interview
        </Text>
      </Box>
    </Grid>
  );
};
