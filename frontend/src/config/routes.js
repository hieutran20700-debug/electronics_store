    import AdminLayout from "../layouts/AdminLayout";
    import MainLayout from "../layouts/MainLayout";
    import Dashboard from "../pages/admin/Dashboard";
    import Login from "../pages/auth/Login";
    import Users from "../pages/admin/Users";
    import Products from "../pages/admin/Products";
    import Categories from "../pages/admin/Categories";
    import HomePage from "../pages/home/HomePage";
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
         
        ],
      },
      {
        path: "/auth",
        children: [
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ];
        
    export default routes;