import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [provider, setProvider] = useState("");
  const [jobs, setJobs] = useState([]);

  return (
    <GlobalContext.Provider
      value={{ profile, setProfile, provider, setProvider, jobs, setJobs }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
