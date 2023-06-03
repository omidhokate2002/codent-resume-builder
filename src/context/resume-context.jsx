import { createContext, useContext, useEffect, useState } from "react";

const ResumeContext = createContext();

const initialState = {
  resumeData: [],
  experience: [],
  contact: {},
  education: [],
  skills: [],
};

export const ResumeContextProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(initialState.resumeData);
  const [experience, setExperience] = useState(initialState.experience);
  const [contact, setContact] = useState(initialState.contact);
  const [education, setEducation] = useState(initialState.education);
  const [skills, setSkills] = useState(initialState.skills);

  useEffect(() => {
    fetch("/resume")
      .then((res) => res.json())
      .then((data) => {
        setResumeData(data);
      });
  }, []);

  const context = {
    resumeData,
    experience,
    contact,
    education,
    skills,
    setExperience,
    setContact,
    setEducation,
    setSkills,
  };

  return (
    <ResumeContext.Provider value={context}>{children}</ResumeContext.Provider>
  );
};

export const useResumeContext = () => useContext(ResumeContext);
