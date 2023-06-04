import { useState } from "react";
import { TextInput } from "../../../components";
import { useResumeSpecificContext } from "../../../context";

export const ExperienceInputs = () => {
  const {
    resumeById: experience,
    dirtyResume,
    setDirtyResume,
  } = useResumeSpecificContext();

  const [experienceInfo, setExperienceInfo] = useState({
    title: experience?.experience[0]?.title,
    company: experience?.experience[0]?.company,
    location: experience?.experience[0]?.location,
    startDate: experience?.experience[0]?.startDate,
    endDate: experience?.experience[0]?.endDate,
    responsibilities: experience?.experience[0]?.responsibilities,
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
    setDirtyResume({ ...dirtyResume, experience: [experienceInfo] });
  };

  return (
    <div>
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

        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>
    </div>
  );
};
