import { Grid, IconButton } from "@chakra-ui/core";
import { Pipelines } from "./Pipeline";
import { PipelineValues } from "./PipelineValues";
import { Sentence } from "./Sentence";

export const PipelineManager = () => {
  return (
    <Grid
      height="100vh"
      w="full"
      bg="#303a4e"
      borderRadius={2}
      overflow="hidden"
      p={4}
      color="white"
      boxShadow="5px 5px 10px rgba(0,0,0,0.5)"
      justifyContent="center"
      alignContent="space-between"
    >
      <Grid
        gridTemplateColumns="800px"
        gridTemplateRows="fit-content(100px) fit-content(300px) fit-content(400px)"
      >
        <Pipelines />
        <PipelineValues />
        <Sentence />
      </Grid>
      <Grid
        mb={"100px"}
        templateColumns="100px 100px"
        templateRows="100px"
        justifyContent="center"
        gridColumnGap="100px"
      >
        <IconButton
          variantColor="green"
          aria-label="Call Segun"
          size="lg"
          icon="check"
          onClick={() => {}}
        />
        <IconButton
          variantColor="red"
          aria-label="Call Segun"
          size="lg"
          icon="close"
        />
      </Grid>
    </Grid>
  );
};
