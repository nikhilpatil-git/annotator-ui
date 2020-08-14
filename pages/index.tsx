import { Grid, Spinner } from "@chakra-ui/core";
import { useEffect, useReducer, Reducer, useContext, useState } from "react";

import { createContext } from "react";
import { Context } from "react";
import {
  PipelineState,
  InitialPipelineState,
  PipelineAction,
} from "../application/pipeline/PipelineStateAction";
import { AuthState } from "../application/auth/AuthStateAction";
import { PipelineReducer } from "../application/pipeline/PipelineReducer";
import { FirebaseTrainingDataFacade } from "../infrastructure/training_data/FirebaseTrainingDataFacade";
import { TrainingDataOrFailure } from "../domain/core/types";
import { AuthStateContext } from "../components/Layout";
import { AnnotatorProgress } from "../components/home/AnnotatorProgress";
import { PipelineManager } from "../components/home/PipelineManager";
import { ErrorModal } from "../components/core/ErrorModal";
import { FetchDataFromServer } from "../components/home/HomeHelper";

export const PipelineStateContext: Context<PipelineState> = createContext(
  InitialPipelineState
);
export const PipelineReducerContext = createContext(
  (() => 0) as React.Dispatch<PipelineAction>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const authState: AuthState = useContext(AuthStateContext);
  const [state, dispatch] = useReducer<Reducer<PipelineState, PipelineAction>>(
    PipelineReducer,
    InitialPipelineState
  );

  useEffect(() => {
    (async () => {
      await FetchDataFromServer(dispatch);
    })();
  }, []);

  useEffect(() => {
    if (state.trainingDataFailureOrSuccessOption) {
      (async () => {
        const firebaseTrainingDataFacade = new FirebaseTrainingDataFacade();
        const successOrFailure = await firebaseTrainingDataFacade.getULabelledData();
        dispatch({
          type: "UpdateTrainingDataFromCache",
          result: successOrFailure,
        });
      })();
    }
  }, [state.trainingDataFailureOrSuccessOption]);

  useEffect(() => {
    console.log(state);
    if (typeof Storage !== "undefined") {
      const trainingData = state.trainingData;
      localStorage.setItem("data", JSON.stringify(trainingData));
    }
  }, [state]);

  useEffect(() => {
    window.setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  const MakeChoice = () => {
    if (isLoading) {
      return (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      );
    } else if (authState.isAuthenticated == true) {
      return (
        <Grid templateColumns="14% 86%" m={2}>
          <AnnotatorProgress />
          <PipelineManager />
        </Grid>
      );
    } else if (authState.isAuthenticated == false) {
      return (
        <ErrorModal errorMessage={"User is not logged in please press Login"} />
      );
    }

    return null;
  };

  return (
    <PipelineReducerContext.Provider value={dispatch}>
      <PipelineStateContext.Provider value={state}>
        <MakeChoice />
      </PipelineStateContext.Provider>
    </PipelineReducerContext.Provider>
  );
}
