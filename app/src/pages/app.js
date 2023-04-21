import { SnackbarProvider } from "notistack";
import { Helmet } from "react-helmet";

import AppContextProvider from "@aabp/context/app/AppContextProvider";
import OktaContextProvider from "@aabp/context/app/OktaContextProvider";
import UnitContextProvider from "@aabp/context/unit/UnitContextProvider";

import Layout from "@aabp/components/Layout";
import AppRouter from "@aabp/components/routers/AppRouter";

import "@aabp/utils/i18n";

const App = () => {
  return (
    <OktaContextProvider>
      <AppContextProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>AABP | Scoutisme traditionnel</title>
        </Helmet>
        <UnitContextProvider>
          <Layout>
            <SnackbarProvider maxSnack={3}>
              <AppRouter />
            </SnackbarProvider>
          </Layout>
        </UnitContextProvider>
      </AppContextProvider>
    </OktaContextProvider>
  );
};

export default App;
