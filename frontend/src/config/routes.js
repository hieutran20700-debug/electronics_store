    import AdminLayout from "../layouts/AdminLayout"
    import Dashboard from "../pages/admin/Dashboard"
    import Users from "../pages/admin/Users";
    import Products from "../pages/admin/Products";
    import Categories from "../pages/admin/Categories";
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
    ];
        
    export default routes;