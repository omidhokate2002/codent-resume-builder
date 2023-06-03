import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home";
import ResumePreview from "../pages/resume-preview";

export const ResumeBuilderRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/preview" element={<ResumePreview />} />
      </Routes>
    </div>
  );
};
