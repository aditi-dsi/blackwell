import Home from "./components/Pages/Home";
import Stake from "./components/Pages/Stake";
import { Routes, Route } from "react-router-dom";
import CreditScore from "../src/components/Pages/CreditScore";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/stake" element={<Stake />} />
        <Route path="/credit-score" element={<CreditScore />} />
        <Route path="/contact" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
