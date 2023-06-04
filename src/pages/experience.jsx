import { ExperienceInputs } from "../apps/resume-crafter";
import "bootstrap/dist/css/bootstrap.min.css";

const Experience = () => {
  return (
    <div className="card experience-card mt-4">
      <div className="card-body">
        <h2 className="card-title">Experience</h2>
        <ExperienceInputs />
      </div>
    </div>
  );
};

export default Experience;
