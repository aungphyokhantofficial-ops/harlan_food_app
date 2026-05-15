import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import App from "./App";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

// Admin Sub-pages
import A_openhour from "./admin/a_openhour";
import A_gallery from "./admin/a_gallery";
import A_contact from "./admin/a_contact";
import A_reservation from "./admin/a_reservation";
import A_menu from "./admin/a_menu";
import Reset from "./pages/Reset";
import Forget from "./pages/Forget";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "reservation", element: <Reservation /> },
      { path: "gallery", element: <Gallery /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "forget", element: <Forget /> },
      { path: "reset/:token", element: <Reset /> },

      // Admin Section ကို ProtectedRoute နဲ့ အုပ်လိုက်ပါ
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <A_menu /> },
          { path: "a_openhour", element: <A_openhour /> },
          { path: "a_menu", element: <A_menu /> },
          { path: "a_gallery", element: <A_gallery /> },
          { path: "a_contact", element: <A_contact /> },
          { path: "a_reservation", element: <A_reservation /> },
        ],
      },
    ],
  },
]);
export default function Router() {
  return <RouterProvider router={router} />;
}
