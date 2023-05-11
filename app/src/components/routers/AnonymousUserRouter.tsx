import { Router } from "@reach/router";
import Profile from "./../profile/Profile";

const AnonymousUserRouter = (): React.ReactNode => {
  return (
    <Router basepath="/app">
      <Profile path="/account" />
      <Profile default />
    </Router>
  );
};

export default AnonymousUserRouter;
