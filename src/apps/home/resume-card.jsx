import { useNavigate } from "react-router-dom";
import { useResumeContext } from "../../context/resume-context";
import { useResumeSpecificContext } from "../../context";

export const ResumeCard = () => {
  const { resumeData } = useResumeContext();
  const { fetchDataById } = useResumeSpecificContext();
  const navigate = useNavigate();

  const handleUpdate = async (resumeId) => {
    await fetchDataById(resumeId);
    navigate("/resume", {
      state: resumeId,
    });
  };

  return (
    <>
      {resumeData.map((resume) => {
        return (
          <div className="card" key={resume.id}>
            <div className="card-body">
              <h5 className="card-title">{resume.profile.title}</h5>
              <p className="card-text">{resume.profile.summary}</p>
              <div className="d-flex justify-content-end">
                <button className="btn btn-danger mr-2">Delete</button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdate(resume?.id)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
