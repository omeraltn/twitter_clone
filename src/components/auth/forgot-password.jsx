import { useState } from "react";
import Modal from "../modal";
import ResetModal from "../modal/reset-modal";

const ForgotPassword = ({ isLoginMode }) => {
  const [isOpen, setIsopen] = useState(false);

  //kayıt olma modunda butonla aynı yükseklikte boş  div ekrana bas
  if (!isLoginMode) return <div className="h-7 w-1" />;
  return (
    <>
      <button
        type="button"
        onClick={() => setIsopen(true)}
        className="text-end text-sm text-gray-500 hover:text-gray-400 mt-2 cursor-pointer hover:underline"
      >
        Şifreni mi unuttun?
      </button>
      <ResetModal isOpen={isOpen} close={() => setIsopen(false)} />
    </>
  );
};

export default ForgotPassword;
