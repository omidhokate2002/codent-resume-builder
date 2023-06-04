import { EducationInputs } from "../apps/resume-crafter";
import "bootstrap/dist/css/bootstrap.min.css";

const Education = () => {
  return (
    <div className="card education-card mt-4">
      <h2 className="card-header">Education</h2>
      <div className="card-body">
        <EducationInputs />
      </div>
    </div>
  );
};

export default Education;
