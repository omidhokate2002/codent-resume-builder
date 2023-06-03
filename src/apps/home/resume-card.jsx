import { useResumeContext } from "../../context/resume-context";

export const ResumeCard = () => {
  const { resumeData } = useResumeContext();
  return (
    <>
      {resumeData.map((resume) => {
        return (
          <div className="card" key={resume.id}>
            <div className="card-body">
              <h5 className="card-title">{resume.title}</h5>
              <p className="card-text">{resume.summary}</p>
              <div className="d-flex justify-content-end">
                <button className="btn btn-danger mr-2">Delete</button>
                <button className="btn btn-primary">Update</button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
