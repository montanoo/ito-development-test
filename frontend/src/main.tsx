import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import Register from "./pages/auth/Register.tsx";
import Login from "./pages/auth/Login.tsx";
import ProtectedRoutes from "./components/protectedRoute/ProtectedRoutes.tsx";
import useUserStore from "./stores/userStore.ts";
import App from "./App.tsx";
import "./styles.css";
import BooksPage from "./pages/booksPage/BooksPage.tsx";
import Books from "./requests/Books.ts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<App />} />
      <Route
        element={
          <ProtectedRoutes
            redirectPath="/"
            isAllowed={!useUserStore.getState().user}
          />
        }
      >
        <Route path="/login" element={<Login />} />
      </Route>
      <Route
        element={
          <ProtectedRoutes
            redirectPath="/"
            isAllowed={!useUserStore.getState().user}
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
            return Books.getById(bookId);
          }
        }}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
