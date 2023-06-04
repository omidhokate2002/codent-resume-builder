import { SkillsInputs } from "../apps/resume-crafter";
import "bootstrap/dist/css/bootstrap.min.css";

const Skills = () => {
  return (
    <div className="card skills-card mt-4">
      <div className="card-body">
        <h2 className="card-title">Skills</h2>
        <SkillsInputs />
      </div>
    </div>
  );
};

export default Skills;
