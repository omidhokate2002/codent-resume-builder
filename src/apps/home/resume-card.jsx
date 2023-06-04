import { useNavigate } from "react-router-dom";
import { useResumeContext } from "../../context/resume-context";
import { useResumeSpecificContext } from "../../context";
import { useEffect, useState } from "react";

export const ResumeCard = () => {
  const { resumeData, isLoading, fetchData } = useResumeContext();
  const [isDeleted, setIsDeleted] = useState(false);
  const { fetchDataById } = useResumeSpecificContext();
  const navigate = useNavigate();

  const handleUpdate = async (resumeId) => {
    await fetchDataById(resumeId);
    navigate("/resume", {
      state: resumeId,
    });
  };

  const handlePreview = async (resumeId) => {
    await fetchDataById(resumeId);
    navigate("/preview", {
      state: resumeId,
    });
  };

  const handleDelete = async (resumeId) => {
    if (window.confirm("Are you sure about deleting this item?")) {
      try {
        setIsDeleted(true);
        await fetch(`/resume/${resumeId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsDeleted(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted]);

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {resumeData.map((resume) => {
            return (
              <div className="card mt-3" key={resume.id}>
                <h5 className="card-header">{resume.profile.title}</h5>
                <div className="card-body">
                  <p className="card-text">{resume.profile.summary}</p>
                  <div className="d-flex justify-content-end gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => handlePreview(resume.id)}
                    >
                      Preview
                    </button>

                    <button
                      className="btn btn-danger mr-2"
                      onClick={() => handleDelete(resume.id)}
                    >
                      Delete
                    </button>
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
      )}
    </>
  );
};
