import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import { createBrowserRouter } from "react-router";
import { loader as AdminLoader } from "./pages/AdminPage";
import { RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <AdminPage />, loader: AdminLoader },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
