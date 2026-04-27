import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="main-wrapper">
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
