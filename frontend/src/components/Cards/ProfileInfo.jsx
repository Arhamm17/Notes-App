
// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { getInitials } from "../../utils/helper";
// import { toast } from "react-toastify";

// const ProfileInfo = ({ onLogout }) => {
//   const [userInfo, setUserInfo] = useState({ username: "Guest" });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/profile", {
//           withCredentials: true,
//         });

//         if (res.data.success === false) {
//           toast.error(res.data.message || "Failed to load profile");
//           return;
//         }

//         setUserInfo({
//           username: res.data.profile?.fullName || "Guest",
//         });
//       } catch (error) {
//           if (err.response?.status !== 401) {
//     toast.error("Error fetching profile");
//   }
//    //     toast.error("Error fetching profile");
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <div className="flex items-center gap-3">
//       <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
//         {getInitials(userInfo.username)}
//       </div>

//       <div>
//         <p className="text-sm font-medium">{userInfo.username}</p>
//       </div>

//       <button
//         className="text-sm bg-red-500 p-1 rounded-md text-white hover:opacity-80"
//         onClick={onLogout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// ProfileInfo.propTypes = {
//   onLogout: PropTypes.func.isRequired,
// };

// export default ProfileInfo;
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { getInitials } from "../../utils/helper";
import { toast } from "react-toastify";

const ProfileInfo = ({ onLogout, onProfileClick }) => {
  const [userInfo, setUserInfo] = useState({ username: "Guest" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/profile", {
          withCredentials: true,
        });

        if (res.data.success === false) {
          toast.error(res.data.message || "Failed to load profile");
          return;
        }

        setUserInfo({
          username: res.data.profile?.fullName || "Guest",
        });
      } catch (error) {
        if (error.response?.status !== 401) {
          toast.error("Error fetching profile");
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div
        className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer"
        onClick={onProfileClick}
        title="View Profile"
      >
        {getInitials(userInfo.username)}
      </div>

      <div>
        <p className="text-sm font-medium">{userInfo.username}</p>
      </div>

      <button
        className="text-sm bg-red-500 p-1 rounded-md text-white hover:opacity-80"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

ProfileInfo.propTypes = {
  onLogout: PropTypes.func.isRequired,
  onProfileClick: PropTypes.func, // new optional prop
};

ProfileInfo.defaultProps = {
  onProfileClick: () => {}, // noop if not provided
};

export default ProfileInfo;
