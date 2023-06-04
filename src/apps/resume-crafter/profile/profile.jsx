import { useState } from "react";
import { TextInput } from "../../../components";
import { useResumeSpecificContext } from "../../../context";

export const ProfileInputs = () => {
  const {
    resumeById: profile,
    dirtyResume,
    setDirtyResume,
  } = useResumeSpecificContext();

  const [profileInfo, setProfileInfo] = useState({
    profileName: profile?.profile?.profileName,
    title: profile?.profile?.title,
    email: profile?.profile?.email,
    phone: profile?.profile?.phone,
    summary: profile?.profile?.summary,
  });

  console.log(profile);

  const { email, profileName, phone, summary, title } = profileInfo;

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
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <TextInput
          label="Name"
          type="text"
          id="profileName"
          name="profileName"
          value={profileName}
          onChange={handleChange}
        />
        <TextInput
          label="Job Title"
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <TextInput
          label="Email"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <TextInput
          label="Phone"
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={handleChange}
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
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>
    </div>
  );
};
