import Head from "next/head";
import { Box, SimpleGrid, Flex, Grid, Button, Divider } from "@chakra-ui/core";
import { NavBar } from "../components/nav-bar/NavBar";
import { Footer } from "../components/Footer";
import { CustomButton } from "../util/CustomButton";
import { Icon } from "@chakra-ui/core";
import { Pipeline } from "../components/home/Pipeline";
import { Sentence } from "../components/home/Sentence";
import { useEffect } from "react";
import { FirebaseClient } from "../infrastructure/core/FirebaseClient";
import { FirebaseDocHandler } from "../infrastructure/core/FirebaseDocHandler";
import { FirebasePipelineFacade } from "../infrastructure/pipeline/FirebasePipelineFacade";
import { DocumentDataToTrainingData } from "../infrastructure/training_data/TrainingDataMapper";

const Steps = () => {
  return <Box></Box>;
};

const Tags = () => {
  return <Box></Box>;
};

const Words = () => {
  return <Box></Box>;
};

export default function Home() {
  const primaryColor = "primary.green";

  useEffect(() => {
    (async () => {
      const firebaseDocHandler = new FirebaseDocHandler();
      const firebasePipelineFacade = new FirebasePipelineFacade(
        firebaseDocHandler
      );

      const result = await firebaseDocHandler.getCollectionWithQueryLimit(
        "data/twitter/tweets",
        JSON.stringify({ key: "state", operater: "==", value: "not-updated" }),
        3
      );

      const finalResult = result.map((doc) => DocumentDataToTrainingData(doc));

      // const result = await firebasePipelineFacade.getPipelines();
      console.log(finalResult);
    })();
  }, []);

  return (
    <Grid templateColumns="14% 86%" m={2}>
      <Box
        height="100vh"
        bg="#303a4e"
        borderRadius={2}
        overflow="hidden"
        p={4}
        color="white"
        boxShadow="5px 5px 10px rgba(0,0,0,0.5)"
        mr={2}
      >
        dd
      </Box>
      <Flex
        height="100vh"
        w="full"
        bg="#303a4e"
        borderRadius={2}
        overflow="hidden"
        p={4}
        color="white"
        boxShadow="5px 5px 10px rgba(0,0,0,0.5)"
        justify="center"
      >
        <Grid
          gridTemplateColumns="800px"
          gridTemplateRows="fit-content(100px) fit-content(300px) fit-content(400px)"
        >
          <Pipeline />
          <SimpleGrid
            gridColumnGap={2}
            gridRowGap={1}
            gridTemplateColumns={"repeat(auto-fit, minmax(20px, 80px))"}
            bg="secondry.purple"
            p={3}
          >
            <CustomButton isSolid={false}>CustomF</CustomButton>
            <CustomButton isSolid={true}>CustomT</CustomButton>
            <CustomButton isSolid={true}>CustomT</CustomButton>
          </SimpleGrid>
          <Sentence />
        </Grid>
      </Flex>
    </Grid>
  );
}

{
  /* <CustomButton isSolid={false}>LEMMA</CustomButton>
<CustomButton isSolid={false}>NER</CustomButton>
<CustomButton isSolid={false}>Sentiments</CustomButton>
<CustomButton isSolid={false}>Category</CustomButton> */
}
