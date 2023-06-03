import React, { useState } from "react";

const SkillsForm = ({ onSave }) => {
  const [skills, setSkills] = useState("");

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
      <h2>Skills</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="skills">Skills (separated by comma)</label>
          <input
            type="text"
            className="form-control"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default SkillsForm;
