import React, { useEffect, useState } from "react"
import Header from "./Header";
import Footer from "./Footer";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <>{isLoading ? (<div className="loading-indicator">
      <img
        src="/logoTixLoading.png"
        className="spinner"
        width={250}
        alt="logo"
      ></img>
    </div>) : (<>
      <Header />
      {children}
      <Footer /></>)}
    </>
  )
}

export default UserLayout
