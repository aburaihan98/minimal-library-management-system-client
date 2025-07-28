import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import Home from "../pages/Home";
import CreateBook from "../pages/CreateBook";
import MainLayout from "../layouts/MainLayout";
import EditBook from "../pages/EditBook";
import Borrow from "../pages/Borrow";
import BorrowSummary from "../pages/BorrowSummary";
import BookDetails from "../pages/BookDetails";
import BookList from "../pages/Books/BookList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        index: true,
        path: "/books",
        element: <BookList />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
      {
        path: "/create-book",
        element: <CreateBook />,
      },
      {
        path: "/edit-book/:bookId",
        element: <EditBook />,
      },
      {
        path: "/borrow/:bookId",
        element: <Borrow />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);

export default router;
