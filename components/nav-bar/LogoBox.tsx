import { Box, Grid, Image, Text } from "@chakra-ui/core";

export const LogoBox = () => {
  return (
    <Box
      alignItems="end"
      justifyContent="start"
      h={["40px", "80px", "80px", "80px"]}
      w={["180px", "260px", "260px", "260px"]}
    >
      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize={["sm", "sm", "2xl", "2xl"]}
      >
        Data Annotator
      </Text>
    </Box>
  );
};
