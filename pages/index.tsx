import Head from "next/head";
import {
  Box,
  SimpleGrid,
  Flex,
  Grid,
  Button,
  Divider,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/core";
import { NavBar } from "../components/nav-bar/NavBar";
import { Footer } from "../components/Footer";
import { CustomButton } from "../util/CustomButton";
import { Icon } from "@chakra-ui/core";
import { Pipelines } from "../components/home/Pipeline";
import { Sentence } from "../components/home/Sentence";
import { useEffect, useReducer, Reducer, useContext } from "react";
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
import {
  InitialAuthState,
  AuthState,
} from "../application/auth/AuthStateAction";
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
import { AuthStateContext } from "../components/Layout";
import { AnnotatorProgress } from "../components/home/AnnotatorProgress";
import { PipelineManager } from "../components/home/PipelineManager";
import { ErrorModal } from "../components/core/ErrorModal";

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

  const authState: AuthState = useContext(AuthStateContext);

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

  const fetchFromServer = async () => {
    const firebaseTrainingDataFacade = new FirebaseTrainingDataFacade();
    const successOrFailure = await firebaseTrainingDataFacade.getULabelledData();
    dispatch({
      type: "UpdateTrainingDataFromCache",
      result: successOrFailure,
    });
  };

  useEffect(() => {
    if (state.trainingDataFailureOrSuccessOption) {
      (async () => {
        await fetchFromServer();
      })();
    }
  }, [state.trainingDataFailureOrSuccessOption]);

  useEffect(() => {
    if (authState) {
      console.log(authState);
    }
  }, [authState]);

  const incrementQuestion = async () => {
    if (state.trainingDataPointer != undefined && state.trainingData) {
      let pointer: number = state.trainingDataPointer;
      pointer = pointer + 1;

      if (pointer < state.trainingData.length) {
        dispatch({ type: "TrainingDataPointer", result: pointer });
        if (localStorage.getItem("dataPointer")) {
          localStorage.setItem("dataPointer", pointer.toString());
        }
      } else {
        console.log("save data");
        // Save the data
        // const firebaseTrainingDataFacade = new FirebaseTrainingDataFacade();
        // const result = await firebaseTrainingDataFacade.saveTrainingData(
        //   state.trainingData
        // );

        // dispatch({
        //   type: "SavingTrainingDataFailed",
        //   result: result,
        // });

        // fetch data from server and delete data in cache
        // if (
        //   localStorage.getItem("data") &&
        //   localStorage.getItem("dataPointer")
        // ) {
        //   localStorage.removeItem("data");
        //   localStorage.setItem("dataPointer", "0");
        //   await fetchFromServer();
        // }
      }
    }
  };

  const IsUserLoggedIn = () => {
    if (authState.isAuthenticated == true) {
      return (
        <Grid templateColumns="14% 86%" m={2}>
          <AnnotatorProgress />
          <PipelineManager />
        </Grid>
      );
    }

    return (
      <Modal isOpen={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>User Not Logged In</ModalBody>
          <ModalFooter>
            <Button variantColor="blue" mr={3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <PipelineReducerContext.Provider value={dispatch}>
      <PipelineStateContext.Provider value={state}>
        {authState.isAuthenticated == true ? (
          <Grid templateColumns="14% 86%" m={2}>
            <AnnotatorProgress />
            <PipelineManager />
          </Grid>
        ) : (
          <ErrorModal
            errorMessage={"User is not logged in please press Login"}
          />
        )}
      </PipelineStateContext.Provider>
    </PipelineReducerContext.Provider>
  );
}
