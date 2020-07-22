import Head from "next/head";
import { Box, SimpleGrid, Flex, Grid, Button, Divider } from "@chakra-ui/core";
import { NavBar } from "../components/nav-bar/NavBar";
import { Footer } from "../components/Footer";
import { CustomButton } from "../util/CustomButton";
import { Icon } from "@chakra-ui/core";
import { Pipelines } from "../components/home/Pipeline";
import { Sentence } from "../components/home/Sentence";
import { useEffect, useReducer, Reducer } from "react";
import { FirebaseClient } from "../infrastructure/core/FirebaseClient";
import { FirebaseDocHandler } from "../infrastructure/core/FirebaseDocHandler";
import { FirebasePipelineFacade } from "../infrastructure/pipeline/FirebasePipelineFacade";
import { DocumentDataToTrainingData } from "../infrastructure/training_data/TrainingDataMapper";

import { createContext } from "react";
import { Context } from "react";
import {
  PipelineState,
  InitialPipelineState,
  PipelineAction,
} from "../application/pipeline/PipelineStateAction";
import { AuthReducer } from "../application/auth/AuthReducer";
import { InitialAuthState } from "../application/auth/AuthStateAction";
import { PipelineReducer } from "../application/pipeline/PipelineReducer";
import { PipelineValues } from "../components/home/PipelineValues";
import { FirebaseTrainingDataFacade } from "../infrastructure/training_data/FirebaseTrainingDataFacade";
import { pipe } from "fp-ts/lib/function";
import { fold } from "fp-ts/lib/Either";
import { PipelineFailure } from "../domain/pipeline/PipelineFailure";
import { Pipeline } from "../domain/pipeline/Pipeline";
import { TrainingDataFailure } from "../domain/training_data/TrainingDataFailure";
import { TrainingData } from "../domain/training_data/TrainingData";
import { TrainingDataOrFailure } from "../domain/core/types";

export const PipelineStateContext: Context<PipelineState> = createContext(
  InitialPipelineState
);
export const PipelineReducerContext = createContext(
  (() => 0) as React.Dispatch<PipelineAction>
);

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

  const [state, dispatch] = useReducer<Reducer<PipelineState, PipelineAction>>(
    PipelineReducer,
    InitialPipelineState
  );

  useEffect(() => {
    (async () => {
      const firebaseTrainingDataFacade = new FirebaseTrainingDataFacade();
      await firebaseTrainingDataFacade
        .getULabelledDataFromCache()
        .then((trainingData: TrainingDataOrFailure) => {
          dispatch({
            type: "UpdateTrainingDataFromCache",
            result: trainingData,
          });
        })
        .catch((error: TrainingDataOrFailure) =>
          dispatch({ type: "UpdateTrainingDataFromCache", result: error })
        );
    })();
  }, []);

  useEffect(() => {
    if (state.trainingDataFaiureOrSuccessOption) {
      (async () => {
        const firebaseTrainingDataFacade = new FirebaseTrainingDataFacade();
        const successOrFailure = await firebaseTrainingDataFacade.getULabelledData();
        dispatch({
          type: "UpdateTrainingDataFromCache",
          result: successOrFailure,
        });
      })();
    }
  }, [state.trainingDataFaiureOrSuccessOption]);

  useEffect(() => {
    if (state) {
      // console.log(state);
    }
  });

  return (
    <PipelineReducerContext.Provider value={dispatch}>
      <PipelineStateContext.Provider value={state}>
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
              <Pipelines />
              <PipelineValues />
              <Sentence />
            </Grid>
          </Flex>
        </Grid>
      </PipelineStateContext.Provider>
    </PipelineReducerContext.Provider>
  );
}

{
  /* <CustomButton isSolid={false}>LEMMA</CustomButton>
<CustomButton isSolid={false}>NER</CustomButton>
<CustomButton isSolid={false}>Sentiments</CustomButton>
<CustomButton isSolid={false}>Category</CustomButton> */
}
