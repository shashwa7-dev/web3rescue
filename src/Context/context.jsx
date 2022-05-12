import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext({});

export function useGCtx() {
  return useContext(GlobalContext);
}

export default function GlobalContextProvider({ children }) {
  const [userData, setUserData] = useState({
    nft_erc_add: "",
    nft_erc_dec: "",
    comp_add: "",
    safe_add: "",
  });

  return (
    <GlobalContext.Provider value={{ userData, setUserData }}>
      {children}
    </GlobalContext.Provider>
  );
}
