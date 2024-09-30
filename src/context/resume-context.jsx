import { createContext, useContext, useEffect, useState } from "react";

const ResumeContext = createContext();

const initialState = {
  id: "",
  resumeData: [],
  fetchData: () => {},
};

export const ResumeContextProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(initialState.resumeData);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await fetch("/resume")
        .then((res) => res.json())
        .then((data) => {
          setResumeData(data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const context = {
    resumeData,
    setResumeData,
    fetchData,
    isLoading,
    setIsLoading,
  };

  return (
    <ResumeContext.Provider value={context}>{children}</ResumeContext.Provider>
  );
};

export const useResumeContext = () => useContext(ResumeContext);
