import { Outlet } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
