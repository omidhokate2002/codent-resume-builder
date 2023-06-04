import { EducationInputs } from "../apps/resume-crafter";
import "bootstrap/dist/css/bootstrap.min.css";

const Education = () => {
  return (
    <div className="card education-card mt-4">
      <div className="card-body">
        <h2 className="card-title">Education</h2>
        <EducationInputs />
      </div>
    </div>
  );
};

export default Education;
