import { createContext, useContext, useState } from "react";

const ResumeSpecificContext = createContext();

const initialState = {
  id: "",
  name: "",
  title: "",
  summary: "",
  resumeData: [],
  experience: [],
  contact: {},
  education: [],
  skills: [],
};

export const ResumeSpecificContextProvider = ({ children }) => {
  const [resumeById, setResumeById] = useState(initialState);
  const [dirtyResume, setDirtyResume] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataById = async (resumeId) => {
    try {
      setIsLoading(true);
      await fetch(`/resume/${resumeId}`)
        .then((res) => res.json())
        .then((data) => {
          setResumeById(data);
          setDirtyResume(structuredClone(data));
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const context = {
    resumeById,
    setResumeById,
    dirtyResume,
    setDirtyResume,
    fetchDataById,
    isLoading,
    setIsLoading,
  };

  return (
    <ResumeSpecificContext.Provider value={context}>
      {children}
    </ResumeSpecificContext.Provider>
  );
};

export const useResumeSpecificContext = () => useContext(ResumeSpecificContext);
