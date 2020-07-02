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
import { MdBuild } from "react-icons/md";
import { LabList } from "../components/lab/LabList";
import { LabFilters } from "../components/lab/LabFilters";
import { LabBanner } from "../components/lab/LabBanner";

const Labs = () => {
  return (
    <Grid w="full" templateRows={"100px 100px auto"} rowGap="2rem" p={4}>
      <LabBanner />
      <LabFilters />
      <LabList />
    </Grid>
  );
};

export default Labs;
