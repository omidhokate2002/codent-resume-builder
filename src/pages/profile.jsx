import { ProfileInputs } from "../apps/resume-crafter";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  return (
    <div className="card profile-card mt-4">
      <div className="card-body">
        <h2 className="card-title">Profile</h2>
        <ProfileInputs />
      </div>
    </div>
  );
};

export default Profile;
