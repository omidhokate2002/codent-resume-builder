import { useEffect, useState } from "react";
import { TextInput } from "../../../components";
import { useResumeSpecificContext } from "../../../context";
import { useLocation } from "react-router-dom";

export const ProfileInputs = () => {
  const {
    resumeById: profile,
    dirtyResume,
    setDirtyResume,
    fetchDataById,
  } = useResumeSpecificContext();

  const { state } = useLocation();

  const [profileInfo, setProfileInfo] = useState({
    profileName: profile?.profile?.profileName,
    title: profile?.profile?.title,
    email: profile?.profile?.email,
    phone: profile?.profile?.phone,
    summary: profile?.profile?.summary,
    address: profile?.profile?.address,
  });

  console.log(profile);

  // useEffect(() => {
  //   fetchDataById(state);
  // }, []);

  useEffect(() => {
    // Update the profileInfo state when the profile data is fetched
    if (profile) {
      setProfileInfo({
        profileName: profile.profile?.profileName ?? "",
        title: profile.profile?.title ?? "",
        email: profile.profile?.email ?? "",
        phone: profile.profile?.phone ?? "",
        summary: profile.profile?.summary ?? "",
      });
    }
  }, [profile]);

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
