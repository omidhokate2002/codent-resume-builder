import { useEffect, useState } from "react";
import { TextInput } from "../../../components";
import { useResumeSpecificContext } from "../../../context";
// import { useLocation } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

export const ProfileInputs = () => {
  const {
    dirtyResume,
    setDirtyResume,
    fetchDataById,
    isSaved,
    alertState,
    setIsSaved,
  } = useResumeSpecificContext();

  // const { state } = useLocation();

  const [profileInfo, setProfileInfo] = useState({
    profileName: dirtyResume?.profile?.profileName,
    title: dirtyResume?.profile?.title,
    email: dirtyResume?.profile?.email,
    phone: dirtyResume?.profile?.phone,
    summary: dirtyResume?.profile?.summary,
    address: dirtyResume?.profile?.address,
  });
  const { vertical, horizontal } = alertState;

  // useEffect(() => {
  //   fetchDataById(state);
  // }, []);

  const { email, profileName, phone, summary, title, address } = profileInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setDirtyResume({ ...dirtyResume, profile: profileInfo });
    setIsSaved(true);
  };

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
          label="Name"
          type="text"
          id="profileName"
          name="profileName"
          value={profileName}
          onChange={handleChange}
          required={true}
        />
        <TextInput
          label="Address"
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={handleChange}
          required={true}
        />
        <TextInput
          label="Job Title"
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
          required={true}
        />
        <TextInput
          label="Email"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          required={true}
        />
        <TextInput
          label="Phone"
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={handleChange}
          required={true}
          pattern="^[6-9]\d{9}$"
        />
        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            className="form-control"
            id="summary"
            rows="4"
            name="summary"
            value={summary}
            onChange={handleChange}
            required={true}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>
    </div>
  );
};
