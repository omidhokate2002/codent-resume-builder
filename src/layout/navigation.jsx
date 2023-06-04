import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useResumeSpecificContext } from "../context";

export const Navigation = () => {
  const navigate = useNavigate();
  const { fetchDataById } = useResumeSpecificContext();

  const generateId = async () => {
    const payload = {
      id: uuidv4(),
      experience: [],
      profile: {
        profileName: "",
        title: "Resume Template",
        summary: "Resume Template for Engineers",
      },
      education: [],
      skills: [],
    };

    await fetch("/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    await fetchDataById(payload.id);

    navigate("/resume", {
      state: payload.id,
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark  py-3">
      <div className="container ml-auto">
        <Link className="navbar-brand" to="/">
          <img src="logo192.png" alt="Resume Builder Icon" width="32" height="32" title="Go to Home" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="nav-link" onClick={generateId}>
                Create Resume
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
