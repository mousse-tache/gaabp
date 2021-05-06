import { Skeleton } from "@material-ui/lab";
import React from "react";

const SuspenseNoSSR = ({fallback, children}) => {
  const isSSR = typeof window === "undefined";
    return (
        <>
        {!isSSR && (
            <React.Suspense fallback={fallback ?? <Skeleton />}>
                {children}
            </React.Suspense>
        )}
        </>
    );
};

export default SuspenseNoSSR;