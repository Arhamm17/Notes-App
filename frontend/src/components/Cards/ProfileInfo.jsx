import PropTypes from "prop-types"; // Import PropTypes

import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(userInfo?.username)}
      </div>

      <div>
        <p className="text-sm font-medium">{userInfo?.username}</p>
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

// Define PropTypes for the component
ProfileInfo.propTypes = {
  onLogout: PropTypes.func.isRequired, // onLogout should be a function and is required
  userInfo: PropTypes.shape({
    // userInfo should be an object with the following structure
    username: PropTypes.string.isRequired, // username should be a string and is required
  }).isRequired, // userInfo itself is required
};

export default ProfileInfo;









// import PropTypes from "prop-types";

// import { getInitials } from "../../utils/helper";

// const ProfileInfo = ({ onLogout, userInfo }) => {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
//         {getInitials(userInfo?.username)}
//       </div>

//       <div>
//         <p className="text-sm font-medium">{userInfo?.username || "Guest"}</p>
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
//   userInfo: PropTypes.shape({
//     username: PropTypes.string,
//   }),
// };

// ProfileInfo.defaultProps = {
//   userInfo: { username: "Guest" },
// };

// export default ProfileInfo;
