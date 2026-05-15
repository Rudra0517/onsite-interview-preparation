import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../components/home/Home";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import Service from "../components/service/Service";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ForgetPassword from "../pages/forgetpassword/ForgetPassword";
import ErrorPage from "../pages/errorpage/ErrorPage";

import UserDashboard from "../components/dashboard/userdashboard/UserDashboard";
import SuperadminDashboard from "../components/dashboard/superadmindashboard/SuperadminDashboard";
import RoleRedirect from "./RoleRedirect";
import Dashboard from "../components/dashboard/Dashboard";
import PrivateRoute from "../privateroute/PrivateRoute";
import AdminRoute from "../privateroute/AdminRoute";
import UserRoute from "../privateroute/UserRoute";
import SuperadminRoute from "../privateroute/SuperadminRoute";
import AdminDashboard from "../components/dashboard/admindashboard/AdminDashboard";
import CreateQuestion from "../components/dashboard/admindashboard/CreateQuestion";
import AllUsers from "../components/dashboard/admindashboard/AllUsers";
import AllQuestions from "../components/dashboard/admindashboard/AllQuestions";
import AdminSetting from "../components/dashboard/admindashboard/AdminSetting";
import PendingAdmins from "../components/dashboard/superadmindashboard/PendingAdmins";
import AllAdmins from "../components/dashboard/superadmindashboard/AllAdmins";
import AllActiveUsers from "../components/dashboard/superadmindashboard/AllActiveUsers";
import UserPanel from "../components/dashboard/userdashboard/UserPanel";
import UserProfile from "../components/dashboard/userdashboard/UserProfile";
import UserAddReview from "../components/dashboard/userdashboard/UserAddReview";
import AdminPannel from "../components/dashboard/admindashboard/AdminPannel";
import AdminProfile from "../components/dashboard/admindashboard/AdminProfile";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "service", element: <Service /> },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <RoleRedirect />,
          },
          {
            path: "/dashboard/user",
            element: (
              <UserRoute>
                <UserPanel />
              </UserRoute>
            ),
            children: [
              {
                path: "/dashboard/user",
                element: <UserDashboard />,
              },
              {
                path: "/dashboard/user/panel",
                element: <UserDashboard />,
              },
              {
                path: "/dashboard/user/profile",
                element: <UserProfile />,
              },
              {
                path: "/dashboard/user/addreview",
                element: <UserAddReview />,
              },
            ],
          },
          {
            path: "/dashboard/admin",
            element: (
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            ),
            children: [
              {
                path: "/dashboard/admin",
                element: <AdminPannel />,
              },
              {
                path: "/dashboard/admin/adminpannel",
                element: <AdminPannel />,
              },
              {
                path: "/dashboard/admin/allusers",
                element: <AllUsers />,
              },
              {
                path: "/dashboard/admin/createquestion",
                element: <CreateQuestion />,
              },
              {
                path: "/dashboard/admin/allquestions",
                element: <AllQuestions />,
              },
              {
                path: "/dashboard/admin/setting",
                element: <AdminSetting />,
              },
              {
                path: "/dashboard/admin/profile",
                element: <AdminProfile />,
              },
            ],
          },
          {
            path: "/dashboard/superadmin",
            element: (
              <SuperadminRoute>
                <SuperadminDashboard />
              </SuperadminRoute>
            ),
            children: [
              {
                path: "/dashboard/superadmin",
                element: <PendingAdmins />,
              },
              {
                path: "/dashboard/superadmin/pendingadmins",
                element: <PendingAdmins />,
              },
              {
                path: "/dashboard/superadmin/alladmins",
                element: <AllAdmins />,
              },
              {
                path: "/dashboard/superadmin/allusers",
                element: <AllActiveUsers />,
              },
            ],
          },
        ],
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgetpassword", element: <ForgetPassword /> },
  {
    path: "/pendingadmins",
    element: (
      <SuperadminRoute>
        <PendingAdmins />
      </SuperadminRoute>
    ),
  },
]);
