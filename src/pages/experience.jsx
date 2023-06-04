import { ExperienceInputs } from "../apps/resume-crafter";
import "bootstrap/dist/css/bootstrap.min.css";

const Experience = () => {
  return (
    <div className="card experience-card mt-4">
      <h2 className="card-header">Experience</h2>
      <div className="card-body">
        <ExperienceInputs />
      </div>
    </div>
  );
};

export default Experience;
