
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
import { useState } from "react";
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

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
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
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <div className="flex items-center gap-6">
        <Link to={"/"}>
          <h2 className="text-xl font-medium text-black py-2">
            <span className="text-slate-500">Good</span>
            <span className="text-slate-900">Notes</span>
          </h2>
        </Link>

        {/* Gemini Nav Link */}
        <Link
          to="/gemini"
          className="text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          Gemini
        </Link>
        <Link
          to="/ocr"
          className="text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          OCR
        </Link>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

Navbar.propTypes = {
  userInfo: PropTypes.shape({
    username: PropTypes.string,
  }),
  onSearchNote: PropTypes.func.isRequired,
  handleClearSearch: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  userInfo: { username: "Wassam" },
};

export default Navbar;
