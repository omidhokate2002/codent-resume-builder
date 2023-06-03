import { useState } from "react";
import { TextInput } from "../../../components";

export const ExperienceInputs = ({ onSave }) => {
  const [experienceInfo, setExperienceInfo] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
  });

  const { title, company, location, startDate, endDate, responsibilities } =
    experienceInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperienceInfo({
      ...experienceInfo,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const experienceData = {
      title,
      company,
      location,
      startDate,
      endDate,
      responsibilities: responsibilities
        .split("\n")
        .filter((res) => res !== ""),
    };

    onSave(experienceData);
    setExperienceInfo({});
  };

  return (
    <div>
      <h2>Experience</h2>
      <form onSubmit={handleSave}>
        <TextInput
          label="Job Title"
          type="text"
          id="title"
          name="title"
          value={title}
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
          label="Company"
          type="text"
          id="company"
          name="company"
          value={company}
          onChange={handleChange}
        />
        <TextInput
          label="Start Date"
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={handleChange}
        />
        <TextInput
          label="End Date"
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={handleChange}
        />
        <div className="form-group">
          <label htmlFor="responsibilities">Responsibilities</label>
          <textarea
            className="form-control"
            id="responsibilities"
            rows="4"
            value={responsibilities}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};
