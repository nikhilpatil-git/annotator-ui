import MediaQuery from "react-responsive";
import React, { FunctionComponent } from "react";

export const SmallScreen: FunctionComponent = ({ children }) => {
  return (
    <MediaQuery minWidth={320} maxWidth={800}>
      {children}
    </MediaQuery>
  );
};

export const LargeScreen: FunctionComponent = ({ children }) => {
  return (
    <MediaQuery minWidth={801} maxWidth={1800}>
      {children}
    </MediaQuery>
  );
};
