import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./pages/SearchPage.tsx";
import ListPage from "./pages/ListPage.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import { ThemeContextProvider } from "./components/theme/ThemeContextProvider.tsx";
import Sidebar from "./components/Sidebar.tsx";
import { TopBar } from "./components/TopBar.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/topbar",
        element: <TopBar />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
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
