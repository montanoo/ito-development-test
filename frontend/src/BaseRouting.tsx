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
import Information from "./requests/Information";

const BaseRouting: React.FC = () => {
  const user = useUserStore((state) => state.user);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<App />}
          loader={async () => {
            const info = await Information.get();
            return info.data;
          }}
        />
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
          <Route
            path="/register"
            element={<Register />}
            loader={async () => {
              const info = await Information.get();
              return info.data;
            }}
          />
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
          <Route
            path="/books/new"
            element={<NewBook />}
            loader={async () => {
              const info = await Information.get();
              return info.data;
            }}
          />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default BaseRouting;
