import React from "react";

const SuspenseNoSSR = ({fallback, children}) => {
  const isSSR = typeof window === "undefined";
    return (
        <>
        {!isSSR && (
            <React.Suspense fallback={fallback ?? <div></div>}>
                {children}
            </React.Suspense>
        )}
        </>
    );
};

export default SuspenseNoSSR;