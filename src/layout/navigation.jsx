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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-4">
      <Link className="navbar-brand" to="/">
        Resume Builder
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
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
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
    </nav>
  );
};
