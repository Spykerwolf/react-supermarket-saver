import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./pages/ListPage.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import { ThemeContextProvider } from "./theme/ThemeContextProvider.tsx";
import Sidebar from "./components/Sidebar.tsx";
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/list",
        element: <ListPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeContextProvider>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeContextProvider>
);
