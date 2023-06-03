import { ResumeCard } from "../apps/home";
import { Footer, Navigation } from "../layout";

const HomePage = () => {
  return (
    <>
      <Navigation />
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <h1>Welcome to Resume Builder</h1>
          <p>Create your professional resume with ease.</p>
          <ResumeCard />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
