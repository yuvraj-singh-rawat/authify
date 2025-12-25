import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { setIsLoggedin, getUserData } = useContext(AppContent);

  useEffect(() => {
    setIsLoggedin(true);
    getUserData();
    navigate("/");
  }, []);

  return <p className="text-center mt-20">Logging you in...</p>;
};

export default AuthSuccess;
