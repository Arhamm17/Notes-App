import { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      dispatch(signInStart());

      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        dispatch(signInFailure(res.data.message));
        return;
      }

      toast.success(res.data.message);
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0efe0] font-nunito px-4">
      <div
        className="w-full max-w-md p-10 rounded-2xl border border-[#e18b43]
        bg-white shadow-[0_4px_20px_rgba(101,57,58,0.2)] transition-all duration-300"
      >
        <form onSubmit={handleLogin}>
          <h4 className="text-3xl font-bold text-[#65393a] text-center mb-8 tracking-tight">
            Welcome Back
          </h4>

          <input
            type="text"
            placeholder="Email"
            className="w-full mb-5 px-4 py-3 rounded-lg border border-[#e18b43]
              bg-[#fdfbf6] placeholder-[#65393a]/50 text-[#414a45] focus:outline-none
              focus:ring-2 focus:ring-[#e18b43] focus:border-[#e18b43] transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-5 px-4 py-3 rounded-lg border border-[#e18b43]
              bg-[#fdfbf6] placeholder-[#65393a]/50 text-[#414a45] focus:outline-none
              focus:ring-2 focus:ring-[#e18b43] focus:border-[#e18b43] transition"
          />

          {error && (
            <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#414a45] text-[#f0efe0] font-semibold
              text-lg hover:bg-[#2c2f2d] transition duration-200"
          >
            Sign In
          </button>

          <p className="text-sm text-center mt-6 text-[#65393a]">
            Not registered yet?{" "}
            <Link
              to={"/signup"}
              className="text-[#e18b43] font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
