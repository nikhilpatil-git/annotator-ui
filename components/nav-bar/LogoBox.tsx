import { Box, Grid, Image, Text } from "@chakra-ui/core";

export const LogoBox = () => {
  return (
    <Box
      alignItems="center"
      h={["40px", "80px", "80px", "80px"]}
      w={["180px", "260px", "260px", "260px"]}
    >
      <Grid
        justifyItems="center"
        alignItems="center"
        templateRows={[
          "repeat(2, 20px)",
          "repeat(2, 40px)",
          "repeat(2, 40px)",
          "repeat(2, 40px)",
        ]}
        rowGap={1}
      >
        <Grid
          justifyItems="center"
          alignItems="center"
          templateColumns={[
            "20px 160px",
            "20px 160px",
            "40px 180px",
            "40px 180px",
          ]}
        >
          <Box size={["20px", "30px", "30px", "30px"]}>
            <Image src="/images/logo.png" alt="mlstudy logo" />
          </Box>
          <Text fontWeight="bold" fontSize={["sm", "sm", "2xl", "2xl"]}>
            MLStudy.Com
          </Text>
        </Grid>
        <Text fontWeight="bold" fontSize={["xs", "sm", "lg", "lg"]}>
          Ace The Technical Interviews
        </Text>
      </Grid>
    </Box>
  );
};
