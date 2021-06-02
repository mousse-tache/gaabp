import React from "react";
import { SnackbarProvider } from 'notistack';
import { Helmet } from "react-helmet";

import AppContextProvider from "@aabp/context/app/AppContextProvider";
import UnitContextProvider from "@aabp/context/unit/unitContextProvider";

import Layout from "@aabp/components/Layout";
import AppRouter from "@aabp/components/routers/AppRouter";

const App = () => {    
    return (        
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
          );
};

export default App;
