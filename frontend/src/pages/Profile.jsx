import HomeNavBar from "../components/HomeNavBar";
import SideBar from "../components/SideBar";

const Profile = () => {
  return (
    <div>
      <HomeNavBar />
      <SideBar />
      <div className="ml-[210px] mt-1 min-h-screen bg-slate-100">
        <div className="bg-white flex justify-between ml-10 p-3 rounded-2xl mr-10 relative top-5">
          <div className="flex">
            <img className="rounded-3xl mr-5" src="/images/avatar.png" alt="" />
            <div className="flex flex-col">
              <div className="flex">
                <p>Tung Pho</p>
                <p>Teacher</p>
              </div>
              <p>tungpho6@gmail.com</p>
              <div>
                <p>Mathematics</p>
                <p>University Of Transport and Communication</p>
              </div>
            </div>
          </div>
          <div></div>
          <button>Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
