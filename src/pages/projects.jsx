import { ProjectInputs } from "../apps/resume-crafter";

const Projects = () => {
  return (
    <>
      <div className="card education-card mt-4">
        <h2 className="card-header bg-dark text-white">Projects</h2>
        <div className="card-body">
          <ProjectInputs />
        </div>
      </div>
    </>
  );
};

export default Projects;
