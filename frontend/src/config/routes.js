import AdminLayout from "../layouts/AdminLayout";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/auth/Login";
import Users from "../pages/admin/Users";
import Products from "../pages/admin/Products";
import Categories from "../pages/admin/Categories/Categories";
import HomePage from "../pages/home/HomePage";
import Register from "../pages/auth/Register";
const routes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default routes;
