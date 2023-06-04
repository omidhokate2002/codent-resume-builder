import { useState } from "react";
import { TextInput } from "../../../components";
import { useResumeSpecificContext } from "../../../context";

export const EducationInputs = () => {
  const {
    resumeById: education,
    dirtyResume,
    setDirtyResume,
  } = useResumeSpecificContext();

  const [educationInfo, setEducationInfo] = useState({
    degree: education?.education[0]?.degree,
    university: education?.education[0]?.university,
    location: education?.education[0]?.location,
    completionDate: education?.education[0]?.completionDate,
  });

  console.log(dirtyResume, education);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationInfo({
      ...educationInfo,
      [name]: value,
    });
  };
  const { degree, university, location, completionDate } = educationInfo;

  const handleSave = (e) => {
    e.preventDefault();
    setDirtyResume({ ...dirtyResume, education: [educationInfo] });
  };

  return (
    <form onSubmit={handleSave}>
      <TextInput
        label="Degree"
        type="text"
        id="degree"
        name="degree"
        value={degree}
        onChange={handleChange}
      />
      <TextInput
        label="Location"
        type="text"
        id="location"
        name="location"
        value={location}
        onChange={handleChange}
      />
      <TextInput
        label="University"
        type="text"
        id="university"
        name="university"
        value={university}
        onChange={handleChange}
      />
      <TextInput
        label="Completion Date"
        type="date"
        id="completionDate"
        name="completionDate"
        value={completionDate}
        onChange={handleChange}
      />

      <button type="submit" className="btn btn-primary mt-3">
        Save
      </button>
    </form>
  );
};
