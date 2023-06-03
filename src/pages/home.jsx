import { ResumeCard } from "../apps/home";
import { ResumeContextProvider } from "../context/resume-context";
import { Footer } from "../layout";
import Navbar from "../layout/navigation";

const HomePage = () => {
  return (
    <ResumeContextProvider>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <h1>Welcome to Resume Builder</h1>
          <p>Create your professional resume with ease.</p>
          <ResumeCard />
        </div>
        <Footer />
      </div>
    </ResumeContextProvider>
  );
};

export default HomePage;
