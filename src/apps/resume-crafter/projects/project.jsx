import { useState } from "react";
import { TextInput } from "../../../components";
import { useResumeSpecificContext } from "../../../context";

export const ProjectInputs = () => {
  const {
    resumeById: project,
    dirtyResume,
    setDirtyResume,
  } = useResumeSpecificContext();

  const [projectInfo, setProjectInfo] = useState({
    projectTitle: project?.project[0]?.projectTitle,
    description: project?.project[0]?.description,
    technologiesUsed: project?.project[0]?.technologiesUsed,
    startDate: project?.project[0]?.startDate,
    endDate: project?.project[0]?.endDate,
  });

  console.log(dirtyResume, "dirty");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectInfo({
      ...projectInfo,
      [name]: value,
    });
  };
  const { projectTitle, description, technologiesUsed, startDate, endDate } =
    projectInfo;

  const handleSave = (e) => {
    e.preventDefault();
    setDirtyResume({ ...dirtyResume, project: [projectInfo] });
  };

  return (
    <form onSubmit={handleSave}>
      <TextInput
        label="Project Title"
        type="text"
        id="projectTitle"
        name="projectTitle"
        value={projectTitle}
        onChange={handleChange}
        required={true}
      />
      <TextInput
        label="Start Date"
        type="date"
        id="startDate"
        name="startDate"
        value={startDate}
        onChange={handleChange}
        required={true}
      />
      <TextInput
        label="End Date"
        type="date"
        id="endDate"
        name="endDate"
        value={endDate}
        onChange={handleChange}
        required={true}
      />
      <div className="form-group">
        <label htmlFor="description">
          Description (Add as a Comma Separated Values)
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="4"
          value={description}
          onChange={handleChange}
          required={true}
        />
      </div>

      <div className="form-group">
        <label htmlFor="technologiesUsed">
          TechnologiesUsed (Add as a Comma Separated Values)
        </label>
        <textarea
          className="form-control"
          id="technologiesUsed"
          name="technologiesUsed"
          rows="4"
          value={technologiesUsed}
          onChange={handleChange}
          required={true}
        />
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Save
      </button>
    </form>
  );
};
