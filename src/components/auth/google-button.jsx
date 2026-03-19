import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";

const GoogleButton = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithPopup(auth, googleProvider).then(() => navigate("/home"));
  };
  return (
    <button
      onClick={handleLogin}
      type="button"
      className="bg-white text-black flex justify-center items-center py-2 px-10 rounded-full hover:bg-gray-200 whitespace-nowrap gap-x-3"
    >
      <img src="/google-logo.png" alt="logo" className="h-5" />
      <span>Google İle Giriş Yap.</span>
    </button>
  );
};

export default GoogleButton;
