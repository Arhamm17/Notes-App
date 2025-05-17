import PropTypes from "prop-types"; // Import PropTypes
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-[#2B85FF] cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  );
};

// Define PropTypes for the component
PasswordInput.propTypes = {
  value: PropTypes.string.isRequired, // value should be a string and is required
  onChange: PropTypes.func.isRequired, // onChange should be a function and is required
  placeholder: PropTypes.string, // placeholder is optional, it should be a string if provided
};

export default PasswordInput;
