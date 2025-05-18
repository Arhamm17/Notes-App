import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

const ProfileView = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    bio: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/profile", {
          withCredentials: true,
        });

        if (res.data.success === false) {
          toast.error(res.data.message || "Failed to load profile");
          return;
        }

        setProfile(res.data.profile);
        setFormData({
          fullName: res.data.profile.fullName || "",
          phoneNumber: res.data.profile.phoneNumber || "",
          bio: res.data.profile.bio || "",
        });
      } catch (error) {
        toast.error("Error fetching profile");
      }
    };

    fetchProfile();
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/profile/update-profile/${profile.userId}`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Profile updated successfully");
        setProfile(res.data.updatedProfile); // optional
        window.location.reload();
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Error updating profile");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: "#65393a" }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4" style={{ borderColor: "#e18b43 transparent" }}></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#e18b43]" style={{ backgroundColor: "#65393a" }}>
        <p>No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#65393a" }}>
    <Navbar userInfo={currentUser?.rest} />
 {/* <Navbar userInfo={profile} /> */}
      <div className="container mx-auto px-4 py-8 text-[#f0efe0]">
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: "#e18b43" }}>
          My Profile
        </h1>

        <div className="bg-[#414a45] p-6 rounded-lg shadow-lg max-w-md mx-auto space-y-4">
          <div>
            <label className="font-semibold">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-[#d49495] text-black"
            />
          </div>

          <div>
            <label className="font-semibold">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-[#d49495] text-black"
            />
          </div>

          <div>
            <label className="font-semibold">Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-[#d49495] text-black"
            />
          </div>

          <div>
            <label className="font-semibold">Email (Read-only):</label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="w-full mt-1 p-2 rounded bg-[#d49495] text-black cursor-not-allowed"
            />
          </div>

          <div>
            <label className="font-semibold">Last Login:</label>
            <p>{new Date(profile.lastLogin).toLocaleString()}</p>
          </div>

          <div>
            <label className="font-semibold">Account Status:</label>
            <p>{profile.accountStatus}</p>
          </div>

          <button
            onClick={handleUpdate}
            className="block w-full text-center bg-[#e18b43] hover:bg-[#d7792c] text-white font-bold py-2 px-4 rounded transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
