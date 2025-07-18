import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import Home from "../pages/Home";
import CreateBook from "../pages/CreateBook";
import MainLayout from "../layouts/MainLayout";
import EditBook from "../pages/EditBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/create-book",
        element: <CreateBook />,
      },
      {
        path: "/edit-book/:bookId",
        element: <EditBook />,
      },
    ],
  },
]);

export default router;
