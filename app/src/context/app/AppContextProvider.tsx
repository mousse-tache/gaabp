import { useOktaAuth } from "@okta/okta-react";
import React from "react";

import AppContext from "./appContext";

import LogoSpinner from "@aabp/components/spinner/LogoSpinner";

import useAuthentication from "@aabp/auth/useAuthentication";
import useFeatures from "@aabp/features/useFeatures";
import LoginPage from "@aabp/login/LoginPage";

const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode => {
  const auth = useAuthentication();
  const features = useFeatures();
  const authState = (typeof useOktaAuth === "function" && useOktaAuth())
    ?.authState;

  if (!authState) {
    return <LogoSpinner />;
  }

  if (!authState.isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <AppContext.Provider value={{ ...auth, features: features }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
