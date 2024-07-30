import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500); 
  }, []);

  return (
    <div className="authLayout">
      {isLoading ? (
        <div className="loading-indicator">
          <img src="/logoTixLoading.png" className="spinner" width={250} alt="logo"></img>
        </div>
      ) : (
        <div className="py-16 px-10" id="overlayCompo">
          <div className="text-center mt-5">
            <img src="/login.png" width={250} alt="Login" />
          </div>
          <button
            className="button1 cursor-pointer"
            onClick={() => navigate(PATH.HOME)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {children}
        </div>
      )}
    </div>
  );
};
export default AuthLayout;
