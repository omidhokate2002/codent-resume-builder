import { ResumeCard } from "../apps/home";
import { Footer, Navigation } from "../layout";

const HomePage = () => {
  return (
    <div>
      <Navigation />
      <div className="container mt-3">
        <div className="row justify-content-center align-items-center">
          <div className="text-center">
            <h1>Welcome to Resume Builder</h1>
            <p><i>Create your professional resume with ease.</i></p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-5 justify-content-center">
            <p><i>previously saved resume cards, you can choose to edit or delete them</i></p>
            <ResumeCard />
          </div>
        </div>
      </div>  
        <Footer />
    </div>
  );
};

export default HomePage;
