import useAuthUser from "@aabp/auth/useAuthUser";
import AnonymousUserRouter from "@aabp/components/routers/AnonymousUserRouter";
import NominatedUserRouter from "@aabp/components/routers/NominatedUserRouter";

const AppRouter = (): React.ReactNode => {
  const authedUser = useAuthUser();

  return (
    <>
      {authedUser?.nominations?.length > 0 || authedUser?.isAdmin ? (
        <NominatedUserRouter />
      ) : (
        <AnonymousUserRouter />
      )}
    </>
  );
};

export default AppRouter;
