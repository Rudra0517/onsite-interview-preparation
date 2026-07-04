import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const Layout = lazy(() => import("../components/layout/Layout"));
const Home = lazy(() => import("../components/home/Home"));
const About = lazy(() => import("../components/about/About"));
const Contact = lazy(() => import("../components/contact/Contact"));
const Service = lazy(() => import("../components/service/Service"));
const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
const ForgetPassword = lazy(
  () => import("../pages/forgetpassword/ForgetPassword"),
);
const ErrorPage = lazy(() => import("../pages/errorpage/ErrorPage"));
const UserDashboard = lazy(
  () => import("../components/dashboard/userdashboard/UserDashboard"),
);
const SuperadminDashboard = lazy(
  () =>
    import("../components/dashboard/superadmindashboard/SuperadminDashboard"),
);
const RoleRedirect = lazy(() => import("./RoleRedirect"));
const Dashboard = lazy(() => import("../components/dashboard/Dashboard"));
const PrivateRoute = lazy(() => import("../privateroute/PrivateRoute"));
const AdminRoute = lazy(() => import("../privateroute/AdminRoute"));
const UserRoute = lazy(() => import("../privateroute/UserRoute"));
const SuperadminRoute = lazy(() => import("../privateroute/SuperadminRoute"));
const AdminDashboard = lazy(
  () => import("../components/dashboard/admindashboard/AdminDashboard"),
);
const CreateQuestion = lazy(
  () => import("../components/dashboard/admindashboard/CreateQuestion"),
);
const AllUsers = lazy(
  () => import("../components/dashboard/admindashboard/AllUsers"),
);
const AllQuestions = lazy(
  () => import("../components/dashboard/admindashboard/AllQuestions"),
);
const AdminSetting = lazy(
  () => import("../components/dashboard/admindashboard/AdminSetting"),
);
const PendingAdmins = lazy(
  () => import("../components/dashboard/superadmindashboard/PendingAdmins"),
);
const AllAdmins = lazy(
  () => import("../components/dashboard/superadmindashboard/AllAdmins"),
);
const AllActiveUsers = lazy(
  () => import("../components/dashboard/superadmindashboard/AllActiveUsers"),
);
const UserPanel = lazy(
  () => import("../components/dashboard/userdashboard/UserPanel"),
);
const UserProfile = lazy(
  () => import("../components/dashboard/userdashboard/UserProfile"),
);
const UserAddReview = lazy(
  () => import("../components/dashboard/userdashboard/UserAddReview"),
);
const AdminPannel = lazy(
  () => import("../components/dashboard/admindashboard/AdminPannel"),
);
const AdminProfile = lazy(
  () => import("../components/dashboard/admindashboard/AdminProfile"),
);

const routes = createBrowserRouter([
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
            path: "user",
            element: (
              <UserRoute>
                <UserPanel />
              </UserRoute>
            ),
            children: [
              {
                index: true,
                element: <UserDashboard />,
              },
              {
                path: "panel",
                element: <UserDashboard />,
              },
              {
                path: "profile",
                element: <UserProfile />,
              },
              {
                path: "addreview",
                element: <UserAddReview />,
              },
              {
                path: "*",
                element: <ErrorPage />,
              },
            ],
          },
          {
            path: "admin",
            element: (
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            ),
            children: [
              {
                index: true,
                element: <AdminPannel />,
              },
              {
                path: "adminpannel",
                element: <AdminPannel />,
              },
              {
                path: "allusers",
                element: <AllUsers />,
              },
              {
                path: "createquestion",
                element: <CreateQuestion />,
              },
              {
                path: "allquestions",
                element: <AllQuestions />,
              },
              {
                path: "setting",
                element: <AdminSetting />,
              },
              {
                path: "profile",
                element: <AdminProfile />,
              },
              {
                path: "*",
                element: <ErrorPage />,
              },
            ],
          },
          {
            path: "superadmin",
            element: (
              <SuperadminRoute>
                <SuperadminDashboard />
              </SuperadminRoute>
            ),
            children: [
              {
                index: true,
                element: <PendingAdmins />,
              },
              {
                path: "pendingadmins",
                element: <PendingAdmins />,
              },
              {
                path: "alladmins",
                element: <AllAdmins />,
              },
              {
                path: "allusers",
                element: <AllActiveUsers />,
              },
              {
                path: "*",
                element: <ErrorPage />,
              },
            ],
          },
          {
            path: "*",
            element: <ErrorPage />,
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgetpassword", element: <ForgetPassword /> },
    ],
  },

  // { path: "/login", element: <Login /> },
  // { path: "/register", element: <Register /> },
  // { path: "/forgetpassword", element: <ForgetPassword /> },
  {
    path: "/pendingadmins",
    element: (
      <SuperadminRoute>
        <PendingAdmins />
      </SuperadminRoute>
    ),
  },
]);

export default routes;
