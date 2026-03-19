import AuthForm from "../../components/auth/auth-form";
import GoogleButton from "../../components/auth/google-button";
import { auth } from "../../firebase";

const Auth = () => {
  return (
    <div className="h-screen bg-dark text-white grid place-items-center">
      <div className="bg-black py-16 px-28 rounded-lg flex flex-col gap-10 sm:w-[80%] max-w-137.5">
        <div className="flex justify-center">
          <img src="x-logo.webp" alt="x-logo" className="h-15" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-center">
          Twitter'a Giriş Yap
        </h1>
        <GoogleButton />
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
