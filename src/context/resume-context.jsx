import { createContext, useContext, useEffect, useState } from "react";

const ResumeContext = createContext();

const initialState = {
  id: "",
  resumeData: [],
  fetchData: () => {},
};

export const ResumeContextProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(initialState.resumeData);

  const fetchData = async () => {
    await fetch("/resume")
      .then((res) => res.json())
      .then((data) => {
        setResumeData(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const context = {
    resumeData,
    setResumeData,
    fetchData,
  };

  return (
    <ResumeContext.Provider value={context}>{children}</ResumeContext.Provider>
  );
};

export const useResumeContext = () => useContext(ResumeContext);
