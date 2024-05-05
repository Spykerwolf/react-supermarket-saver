import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./pages/SearchPage.tsx";
import ListPage from "./pages/ListPage.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import { ThemeContextProvider } from "./components/theme/ThemeContextProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
    errorElement: <PageNotFound />,
  },

  {
    path: "/list",
    element: <ListPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeContextProvider>
    <RouterProvider router={router} />
  </ThemeContextProvider>
);
