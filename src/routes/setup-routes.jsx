import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home";
import ResumePreview from "../pages/resume-preview";
import OmiResume from "../pages/create-resume";
import { PageNotFound } from "../layout";
import { About } from "../layout/about";

export const ResumeBuilderRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/preview" element={<ResumePreview />} />
        <Route path="/resume" element={<OmiResume />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};
