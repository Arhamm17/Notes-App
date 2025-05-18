import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Gemini from "./pages/gemini/gemini";
import TesseractOCR from "./pages/ocr/TesseractOCR";
import ProfileView from "./pages/profile/profileview";
// import UpdateProfile  from "./pages/profile/updateprofile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen bg-[#f0efe0] text-[#414a45] font-nunito">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/gemini" element={<Gemini />} />
          <Route path="/ocr" element={<TesseractOCR />} />
           <Route path="/profile" element={<ProfileView />} />  
         {/* <Route path="/update" element={<UpdateProfile />} /> */}

        </Routes>

        <ToastContainer
          position="top-center"
          toastStyle={{
            backgroundColor: "#f0efe0",
            color: "#65393a",
            border: "1px solid #e18b43",
            fontWeight: "500",
          }}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;

