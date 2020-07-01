import {
  Grid,
  Box,
  Text,
  List,
  ListItem,
  Stack,
  Heading,
  Button,
} from "@chakra-ui/core";
import { title } from "process";

const Banner = () => {
  return (
    <Grid justifyItems="center" alignItems="center">
      <Box
        bg="#303a4e"
        w="full"
        h="full"
        p={5}
        borderRadius={4}
        color="white"
        boxShadow="5px 5px 10px rgba(0,0,0,0.5)"
      >
        <Text alignItems="center" textAlign="center" fontSize="3xl">
          Crack Any Data Science Interview
        </Text>
      </Box>
    </Grid>
  );
};

import { MdBuild } from "react-icons/md";
import { LabList } from "../components/lab/LabList";

const TopicList = () => {
  return (
    <List height="100px" styleType="disc">
      <ListItem w="200px">
        <Button
          height="50px"
          w="150px"
          leftIcon={MdBuild}
          variantColor="pink"
          variant="solid"
        >
          Settings
        </Button>
      </ListItem>

      <ListItem w="200px">
        <Button leftIcon={MdBuild} variantColor="pink" variant="solid">
          Settings
        </Button>
      </ListItem>

      <ListItem w="200px">Data Science</ListItem>
    </List>
  );
};

const LabListLayout = () => {
  return (
    <Grid
      gridColumnGap={2}
      rowGap={3}
      gridTemplateColumns={"repeat(auto-fit, minmax(400px, 1fr))"}
    >
      <Box bg="primary.green" w="300px" p={4} color="white">
        Data Scince
      </Box>
    </Grid>
  );
};

const Labs = () => {
  return (
    <Grid w="full" templateRows={"200px auto"} rowGap="2rem" p={4}>
      <Banner />
      <LabList />
    </Grid>
  );
};

export default Labs;
