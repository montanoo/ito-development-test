import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProtectedRoutes from "./components/protectedRoute/ProtectedRoutes";
import useUserStore from "./stores/userStore";
import App from "./App";
import BooksPage from "./pages/booksPage/BooksPage";
import Books from "./requests/Books";
import NewBook from "./pages/newBook/NewBook";

const BaseRouting: React.FC = () => {
  const user = useUserStore((state) => state.user);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route element={<ProtectedRoutes redirectPath="/" isAllowed={!user} />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route
          element={
            <ProtectedRoutes
              redirectPath="/"
              isAllowed={user?.exists.roleId === 1}
            />
          }
        >
          <Route path="/register" element={<Register />} />
        </Route>
        <Route
          path="/books/:id"
          element={<BooksPage />}
          loader={async ({ params }) => {
            if (params.id) {
              const bookId = parseInt(params.id, 10);
              if (isNaN(bookId)) {
                throw new Error("Invalid book ID");
              }
              const books = await Books.getById(bookId);
              return books.data.book;
            }
          }}
        />
        <Route
          element={
            <ProtectedRoutes
              redirectPath="/"
              isAllowed={user?.exists.roleId === 1}
            />
          }
        >
          <Route path="/books/new" element={<NewBook />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default BaseRouting;
