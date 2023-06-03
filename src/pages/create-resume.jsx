import React, { useState } from "react";
import Education from "./education";
import Profile from "./profile";
import Experience from "./experience";
import Skills from "./skills";

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
      default:
        return null;
    }
  };

  return (
    <div className="container mt-3">
      <nav className="d-flex">
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

export default CreateResume;
