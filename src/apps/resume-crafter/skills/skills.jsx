import React, { useState } from "react";
import { TextInput } from "../../../components";
import { useResumeSpecificContext } from "../../../context";
import _ from "lodash";

export const SkillsInputs = () => {
  const {
    resumeById: skillTags,
    setResumeById,
    dirtyResume,
    setDirtyResume,
  } = useResumeSpecificContext();

  const [skills, setSkills] = useState(skillTags.skills);

  const handleChange = (e) => {
    setSkills(e.target.value);
  };
  const handleSave = (e) => {
    e.preventDefault();
    const skillsData = skills.split(",").map((skill) => skill.trim());
    setDirtyResume({
      ...dirtyResume,
      skills: skillsData,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!_.isEqual(skillTags, dirtyResume)) {
      await fetch(`/resume/${skillTags.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dirtyResume),
      })
        .then((res) => res.json())
        .then((data) => setResumeById(data));
    } else {
      console.log(_.isEqual(skillTags, dirtyResume));
    }
  };

  console.log(dirtyResume);

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
        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
