import { useNavigate } from "react-router-dom";
import { useResumeContext } from "../../context/resume-context";
import { useResumeSpecificContext } from "../../context";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

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
              <div >
                {isLoading ? (
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {resumeData.map((resume) => (
                      <div key={resume.id}>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{resume.profile.title}</h5>
                            <p className="card-text">{resume.profile.summary}</p>
                            <div>
                              <button
                                className="btn btn-danger me-2"
                                onClick={() => handleDelete(resume.id)}
                              >
                                <AiOutlineDelete />
                              </button>
                              <button
                                className="btn btn-primary"
                                onClick={() => handleUpdate(resume?.id)}
                              >
                                <AiOutlineEdit />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
