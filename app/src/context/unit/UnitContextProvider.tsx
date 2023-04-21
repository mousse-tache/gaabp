import { useState } from "react";
import UnitContext from "./unitContext";

const UnitContextProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode => {
  const [unit, setUnit] = useState();

  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </UnitContext.Provider>
  );
};

export default UnitContextProvider;
