import {
  FunctionComponent,
  Context,
  createContext,
  useReducer,
  Reducer,
} from "react";
import { Flex, SimpleGrid } from "@chakra-ui/core";
import { NavBar } from "./nav-bar/NavBar";
import { Footer } from "./Footer";
import {
  AuthState,
  InitialAuthState,
  AuthAction,
} from "../application/auth/AuthStateAction";
import { AuthReducer } from "../application/auth/AuthReducer";

export const AuthStateContext: Context<AuthState> = createContext(
  InitialAuthState
);
export const AuthReducerContext = createContext(
  (() => 0) as React.Dispatch<AuthAction>
);

export const Layout: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<AuthState, AuthAction>>(
    AuthReducer,
    InitialAuthState
  );

  return (
    <AuthReducerContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        <SimpleGrid columns={1}>
          <NavBar />
          {children}
        </SimpleGrid>
      </AuthStateContext.Provider>
    </AuthReducerContext.Provider>
  );
};
