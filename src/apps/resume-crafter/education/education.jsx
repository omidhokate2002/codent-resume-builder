import { useState } from "react";
import { TextInput } from "../../../components";

export const EducationInputs = ({ onSave }) => {
  const [educationInfo, setEducationInfo] = useState({
    degree: "",
    university: "",
    location: "",
    completionDate: "",
  });

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

    const educationData = {
      degree,
      university,
      location,
      completionDate,
    };

    onSave(educationData);
    setEducationInfo({});
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

      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};
