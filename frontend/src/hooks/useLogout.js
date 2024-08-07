import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { url, setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(url + "/api/auth/logout", {
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.data;
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      localStorage.removeItem("token");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
