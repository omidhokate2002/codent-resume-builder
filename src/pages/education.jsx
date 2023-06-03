import React, { useState } from "react";

const EducationForm = ({ onSave }) => {
  const [degree, setDegree] = useState("");
  const [university, setUniversity] = useState("");
  const [location, setLocation] = useState("");
  const [completionDate, setCompletionDate] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    const educationData = {
      degree,
      university,
      location,
      completionDate,
    };

    onSave(educationData);
    setDegree("");
    setUniversity("");
    setLocation("");
    setCompletionDate("");
  };

  return (
    <div>
      <h2>Education</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="degree">Degree</label>
          <input
            type="text"
            className="form-control"
            id="degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="university">University</label>
          <input
            type="text"
            className="form-control"
            id="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="completionDate">Completion Date</label>
          <input
            type="date"
            className="form-control"
            id="completionDate"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default EducationForm;
