import { useNavigate } from "react-router-dom";
import { ResumeCard } from "../apps/home";
import { Footer, Navigation } from "../layout";

const HomePage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/preview");
  };
  return (
    <div>
      <Navigation />
      <button className="btn btn-primary" onClick={handleNavigate}>
        {" "}
        Preview{" "}
      </button>
      <div className="container mt-3">
        <div className="row justify-content-center align-items-center">
          <div className="text-center">
            <h1>Welcome to Resume Builder</h1>
            <p>Create your professional resume with ease.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-5 justify-content-center">
            <ResumeCard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
