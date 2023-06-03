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

  const fetchDataById = async (resumeId) => {
    await fetch(`/resume/${resumeId}`)
      .then((res) => res.json())
      .then((data) => {
        setResumeById(data);
        setDirtyResume(structuredClone(data));
      });
  };

  const context = {
    resumeById,
    setResumeById,
    dirtyResume,
    setDirtyResume,
    fetchDataById,
  };

  return (
    <ResumeSpecificContext.Provider value={context}>
      {children}
    </ResumeSpecificContext.Provider>
  );
};

export const useResumeSpecificContext = () => useContext(ResumeSpecificContext);
