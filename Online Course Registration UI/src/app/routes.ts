import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import About from "./pages/About";
import Courses from "./pages/Courses";
import StudentDashboard from "./pages/StudentDashboard";
import AvailableCourses from "./pages/AvailableCourses";
import MyCourses from "./pages/MyCourses";
import StudentProfile from "./pages/StudentProfile";
import AdminDashboard from "./pages/AdminDashboard";
import ManageCourses from "./pages/ManageCourses";
import ManageStudents from "./pages/ManageStudents";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/about",
    Component: About,
  },
  {
    path: "/courses",
    Component: Courses,
  },
  {
    path: "/student/dashboard",
    Component: StudentDashboard,
  },
  {
    path: "/student/available-courses",
    Component: AvailableCourses,
  },
  {
    path: "/student/my-courses",
    Component: MyCourses,
  },
  {
    path: "/student/profile",
    Component: StudentProfile,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/admin/manage-courses",
    Component: ManageCourses,
  },
  {
    path: "/admin/manage-students",
    Component: ManageStudents,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);