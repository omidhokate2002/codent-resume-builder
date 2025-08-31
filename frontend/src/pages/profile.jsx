import { ProfileInputs } from "../apps/resume-crafter";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  return (
    <div className="card profile-card mt-4">
      <h2 className="card-header bg-dark text-white">Profile</h2>
      <div className="card-body">
        <ProfileInputs />
      </div>
    </div>
  );
};

export default Profile;
