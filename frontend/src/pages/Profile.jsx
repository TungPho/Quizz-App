import HomeNavBar from "../components/HomeNavBar";
import { FaSchool } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import { LiaUserEditSolid } from "react-icons/lia";
import NewSideBar from "../components/NewSideBar";

const Profile = () => {
  return (
    <div>
      <HomeNavBar />
      <NewSideBar />
      <div className="flex justify-center hidden">
        <div className="absolute  z-10 bg-white p-5 flex flex-col rounded-lg top-[150px] w-1/4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <LiaUserEditSolid className="mr-2" />
              <p>Edit profile</p>
            </div>

            <button>X</button>
          </div>
          <label htmlFor="">Edit Your Name</label>
          <input type="text" placeholder="Pho Duc Tung" />
          <label className="font-sans" htmlFor="">
            School / Organization
          </label>
          <input type="text" placeholder="UTC" />
          <div>
            <button>Cancel</button>
            <button>Save Changes</button>
          </div>
        </div>
      </div>

      <div className="ml-[210px] mt-1 min-h-screen bg-slate-100">
        <div className="bg-white w-3/5 flex justify-between ml-10 p-3 rounded-2xl mr-10 relative top-5">
          <div className="flex">
            <img
              className="rounded-3xl mr-5 cursor-pointer hover:opacity-75"
              src="/images/avatar.png"
              alt=""
            />
            <div className="flex flex-col">
              <div className="flex">
                <p className="font-sans">Tung Pho</p>
                <p className="ml-3  rounded-3xl pl-2 pr-2 text-white bg-green-500">
                  Teacher
                </p>
              </div>
              <p className="font-sans">tungpho6@gmail.com</p>
              <div>
                <p className="font-sans font-">Mathematics</p>
                <p className="flex items-center">
                  <FaSchool className="mr-2 text-green-500" />
                  University Of Transport and Communication
                </p>
              </div>
            </div>
          </div>
          <div>
            <button className="flex text-sm items-center font-sans border border-slate-300 p-2">
              <FaEdit className="mr-1" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
