import React, { useState } from "react";
import Education from "./education";
import Profile from "./profile";
import Experience from "./experience";
import Skills from "./skills";
import { Footer, Navigation } from "../layout";
import Projects from "./projects";

const CreateResume = () => {
  const [currentPath, setCurrentPath] = useState("/profile");

  const renderForm = () => {
    switch (currentPath) {
      case "/profile":
        return <Profile />;
      case "/education":
        return <Education />;
      case "/experience":
        return <Experience />;
      case "/skills":
        return <Skills />;
      case "/projects":
        return <Projects />;
      default:
        return null;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <div className="flex-grow-1 container mt-3">
        <nav className="d-flex">
          <button
            onClick={() => setCurrentPath("/profile")}
            className={`btn btn-outline-primary ms-2 ${
              currentPath === "/profile" && "active"
            }`}
          >
            Profile{" "}
            {currentPath === "/profile" && (
              <span className="bg-primary">&#9658;</span>
            )}
          </button>
          <button
            onClick={() => setCurrentPath("/education")}
            className={`btn btn-outline-primary ms-2 ${
              currentPath === "/education" && "active"
            }`}
          >
            Education{" "}
            {currentPath === "/education" && (
              <span className="bg-primary">&#9658;</span>
            )}
          </button>
          <button
            onClick={() => setCurrentPath("/experience")}
            className={`btn btn-outline-primary ms-2 ${
              currentPath === "/experience" && "active"
            }`}
          >
            Experience{" "}
            {currentPath === "/experience" && (
              <span className="bg-primary">&#9658;</span>
            )}
          </button>
          <button
            onClick={() => setCurrentPath("/projects")}
            className={`btn btn-outline-primary ms-2 ${
              currentPath === "/projects" && "active"
            }`}
          >
            Projects{" "}
            {currentPath === "/projects" && (
              <span className="bg-primary">&#9658;</span>
            )}
          </button>

          <button
            onClick={() => setCurrentPath("/skills")}
            className={`btn btn-outline-primary ms-2 ${
              currentPath === "/skills" && "active"
            }`}
          >
            Skills {currentPath === "/skills"}
          </button>
        </nav>

        <div className="flex-grow-1">{renderForm()}</div>
      </div>
      <footer className="text-center ">
        <Footer />
      </footer>
    </div>
  );
};

export default CreateResume;
