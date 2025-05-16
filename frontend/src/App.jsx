// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar"; // import your Navbar
// import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// import Signup from "./pages/Signup/Signup";
// import Gemini from './pages/gemini/gemini';
// import TesseractOCR from './pages/ocr/TesseractOCR';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const App = () => {
//   // You need to pass userInfo, onSearchNote, handleClearSearch props to Navbar
//   // For now, you can pass placeholders or lift state if needed

//   // Example placeholders (replace with your actual implementations)
//   const userInfo = { username: "Haider" };
//   const onSearchNote = (query) => console.log("Searching:", query);
//   const handleClearSearch = () => console.log("Clear search");

//   return (
//     <BrowserRouter>
//       <Navbar 
      
//         userInfo={userInfo} 
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
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Gemini from './pages/gemini/gemini';
import TesseractOCR from './pages/ocr/TesseractOCR';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper component to conditionally show Navbar
const AppContent = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.currentUser);

  const hideNavbarRoutes = ["/login", "/signup"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  const onSearchNote = (query) => console.log("Searching:", query);
  const handleClearSearch = () => console.log("Clear search");

  return (
    <>
      {showNavbar && (
        <Navbar
          onSearchNote={onSearchNote}
          handleClearSearch={handleClearSearch}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/gemini" element={<Gemini />} />
        <Route path="/ocr" element={<TesseractOCR />} />
      </Routes>

      <ToastContainer position="top-center" />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
