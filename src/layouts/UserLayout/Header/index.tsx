import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";

const Header = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  return (
    <nav
      style={{ backgroundColor: "#F3F7EC" }}
      className=" border-gray-200 dark:border-gray-700 z-10 w-full shadow-xl"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-0 ">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://movie-booking-project.vercel.app/img/headTixLogo.png"
            className="h-16"
            alt="Flowbite Logo"
          />
        </Link>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="list-none flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700 bg-transparent">
            <li>
              <Link
                to="/"
                className="no-underline block py-2 px-3 text-black text-xl bg-blue-700 rounded md:bg-transparent md:p-1 dark:bg-blue-600 md:dark:bg-transparent hover:text-red-600"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {currentUser && (
              <li>
                <Link
                  to="/profile"
                  className="no-underline block py-2 px-3 text-gray-700 text-xl bg-blue-700 rounded md:bg-transparent md:p-1 dark:bg-blue-600 md:dark:bg-transparent hover:text-red-600"
                  aria-current="page"
                >
                  <UserOutlined /> {currentUser?.taiKhoan}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
