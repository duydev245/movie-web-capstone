import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { CinemaManagement } from "../modules/Admin/CinemaManagement";
import { MovieManagement } from "../modules/Admin/MovieManagement";
import { UserManagement } from "../modules/Admin/UserManagement";
import { LoginPage } from "../modules/Auth/Login";
import { RegisterPage } from "../modules/Auth/Register";
import { useAppSelector } from "../redux/hooks";
import { PATH } from "./path";
import { AccountSettings } from "../modules/Admin/AccountSettings";
import { HomePage } from "../modules/User/Home";
import { UserLayout } from "../layouts/UserLayout";
import { MovieDetail } from "../modules/User/MovieDetailPage";
import { BookingTicketPage } from "../modules/User/BookingTicket";
import { ProfilePage } from "../modules/User/Profile";

const RejectedRouter = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  if (currentUser === null) {
    return <Outlet />;
  }

  return currentUser.maLoaiNguoiDung === "QuanTri" ? (
    <Navigate to={PATH.ADMIN} />
  ) : (
    <Navigate to={PATH.HOME} />
  );
};

const ProtectedRouter = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  if (currentUser === null) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return currentUser.maLoaiNguoiDung === "QuanTri" ? (
    <Outlet />
  ) : (
    <Navigate to={PATH.HOME} />
  );
};

const useRouteElement = () => {
  const routes = useRoutes([
    // Auth
    {
      path: "auth",
      element: <RejectedRouter />,
      children: [
        {
          path: PATH.LOGIN,
          element: (
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          ),
        },
        {
          path: PATH.REGISTER,
          element: (
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          ),
        },
      ],
    },
    // Admin
    {
      path: PATH.ADMIN,
      element: <ProtectedRouter />,
      children: [
        {
          index: true,
          element: <Navigate to={PATH.ADMIN_USER} />,
        },
        {
          path: PATH.ADMIN_USER,
          element: (
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_MOVIE,
          element: (
            <AdminLayout>
              <MovieManagement />
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_CINEMA,
          element: (
            <AdminLayout>
              <CinemaManagement />
            </AdminLayout>
          ),
        },
        {
          path: PATH.ADMIN_ACCOUNT_SETTINGS,
          element: (
            <AdminLayout>
              <AccountSettings />
            </AdminLayout>
          ),
        },
      ],
    },
    // User
    {
      path: "/",
      children: [
        //Home
        {
          path: PATH.HOME,
          element: <HomePage />,
        },
        //Movie details page
        {
          path: PATH.MOVIE_DETAILS,
          element: (
            <UserLayout>
              <MovieDetail />
            </UserLayout>
          ),
        },
        //Booking page
        {
          path: PATH.BOOKING,
          element: (
            <UserLayout>
              <BookingTicketPage />
            </UserLayout>
          ),
        },
        //Profile User
        {
          path: PATH.PROFILE,
          element: (
            <UserLayout>
              <ProfilePage />
            </UserLayout>
          ),
        },
      ],
    },
  ]);

  return routes;
};

export default useRouteElement;
