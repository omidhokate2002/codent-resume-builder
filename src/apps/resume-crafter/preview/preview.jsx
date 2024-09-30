import { useLocation } from "react-router-dom";
import { useResumeSpecificContext } from "../../../context";
import "./preview.css";
import { useEffect } from "react";
import { getDateInRequiredFormat } from "../../../utils";

export const Preview = () => {
  const { resumeById, fetchDataById } = useResumeSpecificContext();
  const { state } = useLocation();
  const handlePrint = () => window.print();

  useEffect(() => {
    fetchDataById(state);
  }, []);

  const { profile, project, experience, skills, education } = resumeById;
  console.log(education);

  return (
    <div className="mainContainer">
      <div className="A4">
        <div className="sheet">
          <button
            className="btn btn-print btn-sm btn-dark"
            onClick={handlePrint}
          >
            <i className="fa fa-print"></i> Print
          </button>
          <div className="two-column resume">
            <section className="resume__section resume__header">
              <div className="resume__content">
                <h1>{profile?.profileName}</h1>
                <div className="info-item">
                  <span className="info-label">
                    <i className="fa fa-location-arrow"></i>
                  </span>
                  <span className="info-text">{profile?.address}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <span className="info-text">{profile?.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">
                    <i className="fa fa-phone"></i>
                  </span>
                  <span className="info-text">{profile?.phone}</span>
                </div>
              </div>
            </section>

            <div className="resume__columns">
              <div className="resume__main">
                <section className="resume__section resume__summary">
                  <div className="resume__content">
                    <div className="resume__section-title">
                      <i className="fa fa-pencil-square-o"></i>
                      <h2>Professional Summary</h2>
                    </div>
                    <div className="other">
                      <div className="other-info">
                        <p>{profile?.summary}</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="resume__section resume__experience">
                  <div className="resume__content">
                    <div className="resume__section-title">
                      <i className="fa fa-briefcase"></i>
                      <h2>Employment History</h2>
                    </div>
                    {experience &&
                      experience?.map((exp) => {
                        return (
                          <>
                            <div className="xp-item">
                              <div className="xp-job">
                                <span>{exp?.company}</span>
                                <br />
                                <small>{exp?.location}</small>
                              </div>
                              <div className="xp-date">
                                {`${getDateInRequiredFormat(exp.startDate)} -
                                ${getDateInRequiredFormat(exp.endDate)}`}
                              </div>
                              <div className="xp-detail">
                                {exp &&
                                  exp?.responsibilities
                                    .split(",")
                                    .map((res) => {
                                      return (
                                        <>
                                          <ul>
                                            <li>{res.trim()}</li>
                                          </ul>
                                        </>
                                      );
                                    })}
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </section>

                {/* Project Details */}
                <section className="resume__section resume__experience">
                  <div className="resume__content">
                    <div className="resume__section-title">
                      <i className="fa fa-briefcase"></i>
                      <h2>Projects</h2>
                    </div>
                    {project &&
                      project?.map((pro) => {
                        return (
                          <>
                            <div className="xp-item">
                              <div className="xp-job">
                                <span>{pro.projectTitle}</span>
                                <br />
                                {/* <small>{pro.location}</small> */}
                              </div>
                              <div className="xp-date">
                                {`${getDateInRequiredFormat(pro.startDate)} -
                                  ${getDateInRequiredFormat(pro.endDate)}`}
                              </div>
                              <div className="xp-detail">
                                {pro &&
                                  pro.description.split(",").map((res) => {
                                    return (
                                      <>
                                        <ul>
                                          <li>{res.trim()}</li>
                                        </ul>
                                      </>
                                    );
                                  })}
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </section>
                {/* Education Details */}
                <section className="resume__section resume__experience">
                  <div className="resume__content">
                    <div className="resume__section-title">
                      <i className="fa fa-briefcase"></i>
                      <h2>Education Details</h2>
                    </div>
                    {education &&
                      education?.map((educate) => {
                        return (
                          <>
                            <div className="xp-item">
                              <div className="xp-job">
                                <span>
                                  {educate.degree}, {educate.university}
                                </span>
                                <br />
                                <small>{educate.location}</small>
                              </div>
                              <div className="xp-date">
                                {`Completed in 
                                ${getDateInRequiredFormat(
                                  educate.completionDate
                                )}`}
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </section>
              </div>

              <div className="resume__side">
                <section className="resume__section resume__skills">
                  <div className="resume__content">
                    <div className="resume__section-title">
                      <i className="fa fa-align-center"></i>
                      <h2>Skills</h2>
                    </div>
                    <div className="resume__text">
                      {skills &&
                        skills?.map((skill) => {
                          return (
                            <>
                              <div className="extra">
                                <div className="extra-info">
                                  {skill}
                                  <br />
                                  {/* <small>{skill}</small>*/}
                                </div>
                                {/*
                              <div className="extra-details">
                                <div
                                  className="extra-details__progress"
                                  style={{ width: "90%" }}
                                ></div>
                              </div>
                        */}
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </section>

                {/* <section className="resume__section resume__languages">
                  <div className="resume__content">
                    <div className="resume__section-title">
                      <i className="fa fa-globe"></i>
                      <h2>Languages</h2>
                    </div>
                    <div className="extra">
                      <div className="extra-info">
                        Portuguese <small>(native)</small>
                      </div>
                      <div className="extra-details">
                        <div
                          className="extra-details__progress"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="extra">
                      <div className="extra-info">English</div>
                      <div className="extra-details">
                        <div
                          className="extra-details__progress"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="extra">
                      <div className="extra-info">Spanish</div>
                      <div className="extra-details">
                        <div
                          className="extra-details__progress"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </section>
                */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
