import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar/SearchBar";
import ProfileInfo from "./Cards/ProfileInfo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  signInSuccess,
  signoutFailure,
  signoutStart,
} from "../redux/user/userSlice";
import axios from "axios";

const Navbar = ({
  userInfo,
  onSearchNote,
  handleClearSearch,
  searchQuery: propSearchQuery = "",
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(propSearchQuery);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalSearchQuery(propSearchQuery);
  }, [propSearchQuery]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (localSearchQuery.trim()) {
      onSearchNote(localSearchQuery.trim());
    }
  };

  const onClearSearch = () => {
    setLocalSearchQuery("");
    handleClearSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const onLogout = async () => {
    try {
      dispatch(signoutStart());
      const res = await axios.get("http://localhost:3000/api/auth/signout", {
        withCredentials: true,
      });

      if (!res.data.success) {
        dispatch(signoutFailure(res.data.message));
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      dispatch(signInSuccess(null));
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      dispatch(signoutFailure(error.message));
    }
  };

  return (
    <nav
      className="flex items-center justify-between px-6 py-3 sticky top-0 z-50 drop-shadow-md"
      style={{
        backgroundColor: "#f0efe0", // Ivory background
        borderBottom: "1px solid #65393a", // Puce border bottom
      }}
    >
      <div className="flex items-center gap-8">
        <Link to={"/"}>
          <h2
            className="text-xl font-semibold cursor-pointer"
            style={{ color: "#414a45" }} // Charcoal
          >
            <span style={{ color: "#65393a" }}>Notes</span>
            <span style={{ color: "#414a45" }}>Flux</span>
          </h2>
        </Link>

        <Link
          to="/gemini"
          className="text-sm font-medium cursor-pointer"
          style={{ color: "#65393a", transition: "color 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e18b43")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#65393a")}
        >
          Gemini
        </Link>
        <Link
          to="/ocr"
          className="text-sm font-medium cursor-pointer"
          style={{ color: "#65393a", transition: "color 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e18b43")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#65393a")}
        >
          OCR
        </Link>
      </div>

      <SearchBar
        value={localSearchQuery}
        onChange={({ target }) => setLocalSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        onKeyDown={handleKeyDown}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </nav>
  );
};

Navbar.propTypes = {
  userInfo: PropTypes.shape({
    username: PropTypes.string,
  }),
  onSearchNote: PropTypes.func.isRequired,
  handleClearSearch: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
};

Navbar.defaultProps = {
  userInfo: { username: "Wassam" },
  searchQuery: "",
};

export default Navbar;

// import { useState } from "react";
// import PropTypes from "prop-types";
// import SearchBar from "./SearchBar/SearchBar";
// import ProfileInfo from "./Cards/ProfileInfo";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import {
//   signInSuccess,
//   signoutFailure,
//   signoutStart,
// } from "../redux/user/userSlice";
// import axios from "axios";

// const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
//    console.log("userInfo in Navbar:", userInfo);
//   const [searchQuery, setSearchQuery] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // DEBUG LOG
//   console.log("Navbar userInfo:", userInfo);

//   const handleSearch = () => {
//     if (searchQuery) {
//       onSearchNote(searchQuery);
//     }
//   };

//   const onClearSearch = () => {
//     setSearchQuery("");
//     handleClearSearch();
//   };

//   const onLogout = async () => {
//     try {
//       dispatch(signoutStart());

//       const res = await axios.get("http://localhost:3000/api/auth/signout", {
//         withCredentials: true,
//       });

//       if (!res.data.success) {
//         dispatch(signoutFailure(res.data.message));
//         toast.error(res.data.message);
//         return;
//       }

//       toast.success(res.data.message);
//       dispatch(signInSuccess(null)); // clear user data on logout
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.message);
//       dispatch(signoutFailure(error.message));
//     }
//   };

//   return (
//     <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
//       <Link to={"/"}>
//         <h2 className="text-xl font-medium text-black py-2">
//           <span className="text-slate-500">Good</span>
//           <span className="text-slate-900">Notes</span>
//         </h2>
//       </Link>

//       <SearchBar
//         value={searchQuery}
//         onChange={({ target }) => setSearchQuery(target.value)}
//         handleSearch={handleSearch}
//         onClearSearch={onClearSearch}
//       />

//       <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
//     </div>
//   );
// };

// Navbar.propTypes = {
//   userInfo: PropTypes.shape({
//     username: PropTypes.string,
//   }),
//   onSearchNote: PropTypes.func.isRequired,
//   handleClearSearch: PropTypes.func.isRequired,
// };

// Navbar.defaultProps = {
//   userInfo: { username: "Wassam" },
// };

// export default Navbar;
