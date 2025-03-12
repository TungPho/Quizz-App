import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { id, token } = useParams();
  console.log(id, token);
  // fetch to verify user then render this page else show 404
  useEffect(() => {});
  return (
    <div>
      <h1>Reset password</h1>
      <div>
        <input type="text" placeholder="Enter new password" />
        <button>Submit</button>
      </div>
    </div>
  );
};

export default ResetPassword;
