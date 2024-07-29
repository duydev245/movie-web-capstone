import React from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#f5f5f5]">
      <div className="bg-white rounded-2xl p-8">
        <div className="text-center flex items-center justify-center mb-8 cursor-pointer">
          <img src="/vite.svg" width={80} onClick={() => navigate(PATH.HOME)} />
        </div>
        {children}
      </div>
    </div>
  );
};
export default AuthLayout;
