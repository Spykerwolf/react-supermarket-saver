import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./pages/ListPage.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import { ThemeContextProvider } from "./components/theme/ThemeContextProvider.tsx";
import Sidebar from "./components/Sidebar.tsx";

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
    <RouterProvider router={router} />
  </ThemeContextProvider>
);
