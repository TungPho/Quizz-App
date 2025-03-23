import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomNotExist from "./RoomNotExist";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [isVerify, setIsVerify] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const BACK_END_LOCAL_URL = import.meta.env.VITE_LOCAL_API_CALL_URL;
  // fetch to verify user then render this page else show 404
  useEffect(() => {
    const verifyUser = async () => {
      const reqVerify = await fetch(`${BACK_END_LOCAL_URL}/users/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          token,
        }),
      });
      if (reqVerify.status === 200) {
        setIsVerify(true);
      }
    };
    verifyUser();
  }, [id, token]);

  const handleChangePassword = async () => {
    if (!newPassword) {
      alert("Please enter the new password");
      return;
    }
    const reqChangePassword = await fetch(
      `http://localhost:3000/api/v1/users/reset-password/${id}/${token}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          password: newPassword,
        }),
      }
    );
    const res = await reqChangePassword.json();
    console.log(res);
  };

  return isVerify && id && token ? (
    <div>
      <h1>Reset password</h1>
      <div>
        <input
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          type="text"
          placeholder="Enter new password"
        />
        <button
          onClick={() => {
            handleChangePassword();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  ) : (
    <RoomNotExist />
  );
};

export default ResetPassword;
