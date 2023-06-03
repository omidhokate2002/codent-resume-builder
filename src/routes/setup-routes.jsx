import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home";
import ResumePreview from "../pages/resume-preview";
import Navbar from "../layout/navigation";
import OmiResume from "../pages/omi-resume";

export const ResumeBuilderRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/preview" element={<ResumePreview />} />
        <Route path="/resume" element={<OmiResume />} />
      </Routes>
    </div>
  );
};
