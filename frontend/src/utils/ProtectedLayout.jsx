import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedLayout() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const userID = localStorage.getItem("userID");
  const location = useLocation(); // Lấy đường dẫn hiện tại

  // Kiểm tra nếu người dùng đang ở trang /login
  const isLoginPage = location.pathname === "/login";
  useEffect(() => {
    if ((role || userID) && isLoginPage) {
      navigate("/home/explore"); // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    }
    if (!role || !userID) {
      navigate("/login"); // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    }
  }, [role, userID, navigate, isLoginPage, location.pathname]);

  return (
    <div className="flex">
      <div className="flex-1">
        <Outlet />
        {/* Các component con (nội dung trang) sẽ được render tại đây */}
      </div>
    </div>
  );
}
