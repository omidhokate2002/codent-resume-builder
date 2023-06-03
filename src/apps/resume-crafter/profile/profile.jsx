import { useState } from "react";
import { TextInput } from "../../../components";

export const ProfileInputs = ({ onSave }) => {
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    summary: "",
  });

  const { email, name, phone, summary, title } = profileInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const profileData = {
      name,
      title,
      email,
      phone,
      summary,
    };

    onSave(profileData);
    setProfileInfo("");
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <TextInput
          label="Name"
          type="text"
          id="profileName"
          name="profileName"
          value={name}
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
          type="phone"
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
            value={summary}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};
