import { ResumeCard } from "../apps/home";
import { Footer, Navigation } from "../layout";

const HomePage = () => {
  return (
    <>
      <Navigation />
      <div className="container mt-5">
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
    </>
  );
};

export default HomePage;
