import React, { useState } from "react";
import { TextInput } from "../../../components";

export const SkillsInputs = ({ onSave }) => {
  const [skills, setSkills] = useState("");

  const handleChange = (e) => {
    setSkills(e.target.value);
  };
  const handleSave = (e) => {
    e.preventDefault();

    const skillsData = {
      skills: skills.split(",").map((skill) => skill.trim()),
    };

    onSave(skillsData);
    setSkills("");
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <TextInput
          label="Skills (separated by comma)"
          name="skills"
          id="skills"
          value={skills}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};
