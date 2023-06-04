import "./preview.css";

const ResumePreview = () => {
  const handlePrint = () => window.print();
  return (
    <div className="mainContainer">
      <div className="A4">
        <div className="sheet">
          <button
            className="btn btn-print btn-sm btn-light"
            onClick={handlePrint}
          >
            <i className="fa fa-print"></i> Print
          </button>
          <div className="two-column resume">
            <section className="resume__section resume__header">
              <div className="resume__content">
                <h1>Thiago Braga</h1>
                <div className="info-item">
                  <span className="info-label">
                    <i className="fa fa-location-arrow"></i>
                  </span>
                  <span className="info-text">
                    770 Marçal de Arruda Campos St., Bauru, SP, Brazil, Zip:
                    17063-060
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <span className="info-text">contato@thiagobraga.org</span>
                </div>
                <div className="info-item">
                  <span className="info-label">
                    <i className="fa fa-phone"></i>
                  </span>
                  <span className="info-text">+55 14 99165 5873</span>
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
                        <p>
                          PHP & JavaScript developer + Devops Enthusiast with a
                          decade of success leading teams in delivering
                          appropriate technology solutions for desktop and
                          mobile products.
                        </p>
                        <p>
                          Comprehensive knowledge of enterprise architecture,
                          agile methodologies, remote work, cloud services and
                          web-based applications.
                        </p>
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
                    <div className="xp-item">
                      <div className="xp-job">
                        Full Stack Developer / DevOps{" "}
                        <span>@ Grupo Tesseract</span>
                        <br />
                        <small>Bauru, Sao Paulo</small>
                      </div>
                      <div className="xp-date">Apr. 2017 – current</div>
                      <div className="xp-detail">
                        <ul>
                          <li>
                            Design, build or maintain web sites using Laravel,
                            Bootstrap, Vue, React and WordPress
                          </li>
                          <li>Create scripting language tools</li>
                          <li>Automate dev, builds and deploy tasks</li>
                          <li>
                            Maintain understanding of current web technologies
                            or programming practices through continuing
                            education, reading and sharing knowledge
                          </li>
                          <li>
                            Develop databases that support web applications and
                            web sites
                          </li>
                          <li>
                            Develop and document style guidelines for web site
                            content
                          </li>
                          <li>
                            Recommend and implement performance improvements
                          </li>
                          <li>
                            Select programming languages, design tools, or
                            applications
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="xp-item">
                      <div className="xp-job">
                        Full Stack Developer{" "}
                        <span>@ Jurid Publicações Eletrônicas</span>
                        <br />
                        <small>Bauru, Sao Paulo</small>
                      </div>
                      <div className="xp-date">Aug. 2018 – Apr. 2020</div>
                      <div className="xp-detail">
                        <ul>
                          <li>
                            Build or maintain web sites using native PHP, Python
                            and JavaScript
                          </li>
                          <li>
                            Maintain and improve production databases running on
                            Elasticsearch, Redis, PostgreSQL and MySQL
                          </li>
                          <li>
                            Provide backup and maintenance of GNU/Linux servers
                          </li>
                          <li>
                            Provide documentation for existent and new
                            applications
                          </li>
                        </ul>
                      </div>
                    </div>
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
                      <div className="extra">
                        <div className="extra-info">
                          PHP
                          <br />
                          <small>PHP 5 · PHP 7 · Laravel</small>
                        </div>
                        <div className="extra-details">
                          <div
                            className="extra-details__progress"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="extra">
                        <div className="extra-info">
                          JavaScript
                          <br />
                          <small>React · React Native · Vue</small>
                        </div>
                        <div className="extra-details">
                          <div
                            className="extra-details__progress"
                            style={{ width: "87%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="extra">
                        <div className="extra-info">
                          HTML
                          <br />
                          <small>HTML5 · Markdown · Pug</small>
                        </div>
                        <div className="extra-details">
                          <div
                            className="extra-details__progress"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="extra">
                        <div className="extra-info">
                          CSS
                          <br />
                          <small>Stylus · Sass · Bootstrap</small>
                        </div>
                        <div className="extra-details">
                          <div
                            className="extra-details__progress"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="extra">
                        <div className="extra-info">
                          DevOps
                          <br />
                          <small>Docker · Shell · AWS · CI/CD</small>
                        </div>
                        <div className="extra-details">
                          <div
                            className="extra-details__progress"
                            style={{ width: "82%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="extra">
                        <div className="extra-info">
                          Databases
                          <br />
                          <small>
                            PostgreSQL · MySQL · Elasticsearch · Redis
                          </small>
                        </div>
                        <div className="extra-details">
                          <div
                            className="extra-details__progress"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="extra">
                        <div className="extra-info">
                          Operating Systems
                          <br />
                          <small>
                            <i className="fa fa-linux"></i> GNU/Linux ·
                            <i className="fa fa-apple"></i> Mac OS ·
                            <i className="fa fa-windows"></i> Windows
                          </small>
                        </div>
                        <div className="extra-details">
                          <div
                            className="extra-details__progress"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="resume__section resume__languages">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
