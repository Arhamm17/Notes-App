// import { useState, useEffect } from "react";
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

// const Navbar = ({
//   onSearchNote,
//   handleClearSearch,
//   searchQuery: propSearchQuery = "",
// }) => {
//   const [localSearchQuery, setLocalSearchQuery] = useState(propSearchQuery);
//   const [userInfo, setUserInfo] = useState({
//     fullName: "",
//   }); // 🌟 Local state for profile
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     setLocalSearchQuery(propSearchQuery);
//   }, [propSearchQuery]);

//   useEffect(() => {
//     // 🌟 Fetch user info when Navbar mounts
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/profile", {
//           withCredentials: true,
//         });
//         if (res.data?.profile) {
//           setUserInfo({
//             fullName: res.data.profile.fullName || "",
//           })
//           //setUserInfo(res.data.profile);
//         } else {
//           toast.error("Failed to fetch profile");
//         }
//       } catch (err) {
//         if (err.response?.status !== 401) {
//         toast.error("Error fetching profile");
//        }
      
//         console.error(err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleSearch = (e) => {
//     e?.preventDefault();
//     if (localSearchQuery.trim()) {
//       onSearchNote(localSearchQuery.trim());
//     }
//   };

//   const onClearSearch = () => {
//     setLocalSearchQuery("");
//     handleClearSearch();
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
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
//       dispatch(signInSuccess(null));
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.message);
//       dispatch(signoutFailure(error.message));
//     }
//   };

//   return (
//     <nav
//       className="flex items-center justify-between px-6 py-3 sticky top-0 z-50 drop-shadow-md"
//       style={{
//         backgroundColor: "#f0efe0", // Ivory background
//         borderBottom: "1px solid #65393a", // Puce border bottom
//       }}
//     >
//       <div className="flex items-center gap-8">
//         <Link to={"/"}>
//           <h2
//             className="text-xl font-semibold cursor-pointer"
//             style={{ color: "#414a45" }} // Charcoal
//           >
//             <span style={{ color: "#65393a" }}>Notes</span>
//             <span style={{ color: "#414a45" }}>Flux</span>
//           </h2>
//         </Link>

//         <Link
//           to="/gemini"
//           className="text-sm font-medium cursor-pointer"
//           style={{ color: "#65393a", transition: "color 0.3s" }}
//           onMouseEnter={(e) => (e.currentTarget.style.color = "#e18b43")}
//           onMouseLeave={(e) => (e.currentTarget.style.color = "#65393a")}
//         >
//           Gemini
//         </Link>
//         <Link
//           to="/ocr"
//           className="text-sm font-medium cursor-pointer"
//           style={{ color: "#65393a", transition: "color 0.3s" }}
//           onMouseEnter={(e) => (e.currentTarget.style.color = "#e18b43")}
//           onMouseLeave={(e) => (e.currentTarget.style.color = "#65393a")}
//         >
//           OCR
//         </Link>
//       </div>

//       <SearchBar
//         value={localSearchQuery}
//         onChange={({ target }) => setLocalSearchQuery(target.value)}
//         handleSearch={handleSearch}
//         onClearSearch={onClearSearch}
//         onKeyDown={handleKeyDown}
//       />

//       <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
//     </nav>
//   );
// };

// export default Navbar;
import { useState, useEffect } from "react";
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

  // New handler for clicking profile info initials or name
  const handleProfileClick = () => {
    navigate("/profile");
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

      <ProfileInfo onLogout={onLogout} onProfileClick={handleProfileClick} />
    </nav>
  );
};

export default Navbar;
