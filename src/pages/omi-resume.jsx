import React, { useState } from "react";
import EducationForm from "./education";
import ProfileForm from "./profile";
import ExperienceForm from "./experience";
import SkillsForm from "./skills";

const OmiResume = () => {
  const [currentPath, setCurrentPath] = useState("/profile");

  const renderForm = () => {
    switch (currentPath) {
      case "/profile":
        return <ProfileForm />;
      case "/education":
        return <EducationForm />;
      case "/experience":
        return <ExperienceForm />;
      case "/skills":
        return <SkillsForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      <nav style={{ display: "flex" }}>
        <button
          onClick={() => setCurrentPath("/profile")}
          style={{
            marginRight: "10px",
            backgroundColor: currentPath === "/profile" ? "lightblue" : "white",
          }}
        >
          Profile {currentPath === "/profile" && <span>&#9658;</span>}
        </button>
        <button
          onClick={() => setCurrentPath("/education")}
          style={{
            marginRight: "10px",
            backgroundColor:
              currentPath === "/education" ? "lightblue" : "white",
          }}
        >
          Education {currentPath === "/education" && <span>&#9658;</span>}
        </button>
        <button
          onClick={() => setCurrentPath("/experience")}
          style={{
            marginRight: "10px",
            backgroundColor:
              currentPath === "/experience" ? "lightblue" : "white",
          }}
        >
          Experience {currentPath === "/experience" && <span>&#9658;</span>}
        </button>
        <button
          onClick={() => setCurrentPath("/skills")}
          style={{
            marginRight: "10px",
            backgroundColor: currentPath === "/skills" ? "lightblue" : "white",
          }}
        >
          Skills {currentPath === "/skills" && <span>&#9658;</span>}
        </button>
      </nav>

      {renderForm()}
    </div>
  );
};

export default OmiResume;
