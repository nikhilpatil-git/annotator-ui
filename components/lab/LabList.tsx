import { Grid, Box, Link, Text, Button } from "@chakra-ui/core";
import { LabMetaData, Labs } from "../../util/Data";
import { FaPython } from "react-icons/fa";

export const LabSummary = () => {
  const primaryColor = "primary.green";
  const primaryLightColor = "primary.lightGreen";

  return (
    <Box
      bg="#303a4e"
      borderBottomColor={primaryColor}
      borderBottomWidth={4}
      borderRadius={4}
      overflow="hidden"
      w="300px"
      p={4}
      color="white"
      boxShadow="5px 5px 10px rgba(0,0,0,0.5)"
    >
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        Introduction To Python
      </Box>
      <Box d="flex" mt="2" alignItems="center" justifyContent="space-between">
        <Link
          _hover={{
            color: "white",
            transform: "scale(1.0)",
            fontWeight: "bold",
          }}
          style={{ textDecoration: "none" }}
        >
          <Text fontSize="sm">Details</Text>
        </Link>
        <Text>35 min</Text>
      </Box>
      <Box d="flex" mt="2" alignItems="center" justifyContent="space-between">
        <Box size="32px" as={FaPython} color={primaryColor} />
        <Button
          _hover={{ bg: primaryLightColor }}
          backgroundColor={primaryColor}
          _active={{
            bg: primaryLightColor,
            transform: "scale(0.98)",
            borderColor: "#bec3c9",
          }}
          _focus={{
            outline: 0,
          }}
          outline={0}
          variant="solid"
        >
          Launch
        </Button>
      </Box>
    </Box>
  );
};

export const LabList = () => {
  const labItems = Labs.map((item: LabMetaData, index: number) => {
    return <LabSummary key={index} />;
  });

  return (
    <Grid
      gridColumnGap={3}
      rowGap={3}
      gridTemplateColumns={"repeat(auto-fit, minmax(300px, 1fr))"}
      justifyItems="center"
    >
      {labItems}
    </Grid>
  );
};
