import React from "react";

const NominationContext = React.createContext({
  user: {
    id: null,
  },
  nomination: {
    unit: null,
    group: null,
    role: null,
    approvers: [],
    motivation: "",
    vaj: null,
  },
});

export default NominationContext;
