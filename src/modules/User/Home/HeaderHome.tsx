import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useAppSelector } from "../../../redux/hooks";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { removeLocalStorage } from "../../../utils";

const HeaderHome = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const handleLogOut = () => {
    removeLocalStorage("user");
    window.location.reload();
  };

  return (
    <nav
      style={{ backgroundColor: "#F3F7EC" }}
      className=" border-gray-200 dark:border-gray-700 z-10 w-full fixed shadow-xl"
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
          <ul className=" list-none flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700 bg-transparent ">
            <li>
              <ScrollLink
                to="listMovie"
                smooth={true}
                className="block cursor-pointer py-2 px-3 text-xl text-black bg-blue-700 rounded md:bg-transparent md:p-1  dark:bg-blue-600 md:dark:bg-transparent  hover:text-red-600"
                aria-current="page"
              >
                Lịch chiếu
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="cinemas"
                smooth={true}
                className="block cursor-pointer py-2 px-3 text-xl text-black bg-blue-700 rounded md:bg-transparent md:p-1  dark:bg-blue-600 md:dark:bg-transparent hover:text-red-600"
                aria-current="page"
              >
                Cụm rạp
              </ScrollLink>
            </li>
          </ul>
        </div>
        <div>
          {!currentUser && (
            <ul className="list-none flex justify-center items-center">
              <li>
                <Link
                  to="auth/login"
                  className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-1 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent  hover:text-red-600 no-underline"
                  aria-current="page"
                >
                  Đăng nhập
                </Link>
              </li>
              <span className="text-xl text-gray-500">|</span>
              <li>
                <Link
                  to="/auth/register"
                  className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-1 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent  hover:text-red-600 no-underline"
                  aria-current="page"
                >
                  Đăng ký
                </Link>
              </li>
            </ul>
          )}
          {currentUser && (
            <ul className="list-none flex items-center">
              <li>
                <Link
                  to={currentUser.maLoaiNguoiDung === 'QuanTri' ? '/admin/user' : '/profile'}
                  className="no-underline block py-2 px-3 text-gray-700 text-xl bg-blue-700 rounded md:bg-transparent md:p-1 dark:bg-blue-600 md:dark:bg-transparent hover:text-red-600"
                  aria-current="page"
                >
                  <UserOutlined /> {currentUser.taiKhoan}
                </Link>
              </li>
              <li>
                <Button
                  onClick={handleLogOut}
                  className="mx- font-medium"
                  size="small"
                  type="default"
                  danger
                >
                  Đăng xuất
                </Button>
              </li>
            </ul>
          )}
          { }
        </div>
      </div>
    </nav>
  );
};

export default HeaderHome;
