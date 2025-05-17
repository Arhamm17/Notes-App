import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Gemini from "./pages/gemini/gemini";
import TesseractOCR from "./pages/ocr/TesseractOCR";

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

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// import Signup from "./pages/Signup/Signup";
// import Gemini from "./pages/gemini/gemini";
// import TesseractOCR from "./pages/ocr/TesseractOCR";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const App = () => {
//   // Optional: You can define or lift search-related functions here if needed
//   const onSearchNote = (query) => console.log("Searching:", query);
//   const handleClearSearch = () => console.log("Clear search");

//   return (
//     <BrowserRouter>
//       <Navbar
//         onSearchNote={onSearchNote}
//         handleClearSearch={handleClearSearch}
//       />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/gemini" element={<Gemini />} />
//         <Route path="/ocr" element={<TesseractOCR />} />
//       </Routes>

//       <ToastContainer position="top-center" />
//     </BrowserRouter>
//   );
// };

// export default App;
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// import Signup from "./pages/Signup/Signup";
// import Gemini from './pages/gemini/gemini';
// import TesseractOCR from './pages/ocr/TesseractOCR';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Helper component to conditionally show Navbar
// const AppContent = () => {
//   const location = useLocation();
//   const user = useSelector((state) => state.user.currentUser);

//   const hideNavbarRoutes = ["/login", "/signup"];
//   const showNavbar = !hideNavbarRoutes.includes(location.pathname);

//   const onSearchNote = (query) => console.log("Searching:", query);
//   const handleClearSearch = () => console.log("Clear search");

//   return (
//     <>
//       {showNavbar && (
//         <Navbar
//           onSearchNote={onSearchNote}
//           handleClearSearch={handleClearSearch}
//         />
//       )}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/gemini" element={<Gemini />} />
//         <Route path="/ocr" element={<TesseractOCR />} />
//       </Routes>

//       <ToastContainer position="top-center" />
//     </>
//   );
// };

// const App = () => (
//   <BrowserRouter>
//     <AppContent />
//   </BrowserRouter>
// );

// export default App;
