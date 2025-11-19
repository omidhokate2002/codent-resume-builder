import { useState } from "react";
import { TextInput } from "../../../components";
import { useResumeSpecificContext } from "../../../context";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

export const SkillsInputs = () => {
  const {
    resumeById,
    setResumeById,
    dirtyResume,
    setDirtyResume,
    isSaved,
    setIsSaved,
    alertState,
  } = useResumeSpecificContext();
  const navigate = useNavigate();

  const [skills, setSkills] = useState(dirtyResume?.skills);
  const { vertical, horizontal } = alertState;

  const handleChange = (e) => {
    setSkills(e.target.value);
  };
  const handleSave = (e) => {
    e.preventDefault();
    const skillsData = skills.toString().split(",").map((skill) => skill.trim());
    setDirtyResume({
      ...dirtyResume,
      skills: skillsData,
    });
    setIsSaved(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!_.isEqual(resumeById, dirtyResume)) {
      await fetch(`/resume/${resumeById.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dirtyResume),
      })
        .then((res) => res.json())
        .then((data) => setResumeById(data));
      navigate("/");
    }
  };

  console.log(dirtyResume);

  return (
    <div>
      {isSaved && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={isSaved}
          autoHideDuration={6000}
          onClose={() => setIsSaved(false)}
          key={vertical + horizontal}
          style={{ backgroundColor: "green" }}
        >
          <Alert
            onClose={() => setIsSaved(!isSaved)}
            severity="success"
            sx={{ width: "100%" }}
            style={{ backgroundColor: "green" }}
          >
            Changes Saved Successfully! Please Submit the data in skills Section
          </Alert>
        </Snackbar>
      )}
      <form onSubmit={handleSave}>
        <TextInput
          label="Skills (separated by comma)"
          name="skills"
          id="skills"
          value={skills}
          onChange={handleChange}
          required={true}
        />
        <div className="d-flex justify-content-start gap-3">
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
        </div>
      </form>
    </div>
  );
};
