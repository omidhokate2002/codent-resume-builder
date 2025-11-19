import { useState } from "react";
import { TextInput } from "../../../components";
import { useResumeSpecificContext } from "../../../context";
import { Snackbar, Alert } from "@mui/material";

export const EducationInputs = () => {
  const { dirtyResume, setDirtyResume, isSaved, setIsSaved, alertState } =
    useResumeSpecificContext();

  const [educationInfo, setEducationInfo] = useState({
    degree: dirtyResume?.education[0]?.degree,
    university: dirtyResume?.education[0]?.university,
    location: dirtyResume?.education[0]?.location,
    completionDate: dirtyResume?.education[0]?.completionDate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationInfo({
      ...educationInfo,
      [name]: value,
    });
  };
  const { degree, university, location, completionDate } = educationInfo;
  const { vertical, horizontal } = alertState;

  const handleSave = (e) => {
    e.preventDefault();
    setDirtyResume({ ...dirtyResume, education: [educationInfo] });
    setIsSaved(true);
  };

  return (
    <>
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
          label="Degree"
          type="text"
          id="degree"
          name="degree"
          value={degree}
          onChange={handleChange}
          required={true}
        />
        <TextInput
          label="Location"
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={handleChange}
          required={true}
        />
        <TextInput
          label="University"
          type="text"
          id="university"
          name="university"
          value={university}
          onChange={handleChange}
          required={true}
        />
        <TextInput
          label="Completion Date"
          type="date"
          id="completionDate"
          name="completionDate"
          value={completionDate}
          onChange={handleChange}
          required={true}
        />

        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>
    </>
  );
};
