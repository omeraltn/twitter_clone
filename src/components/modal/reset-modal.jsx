import { useRef } from "react";
import Modal from ".";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

const ResetModal = ({ isOpen, close }) => {
  const emailInputRef = useRef(null);
  //
  const handleClick = () => {
    //inputtaki yazıya erişmek - mailinzi girin yazısı
    const email = emailInputRef.current.value.trim();
    //mail girilmediyse
    if (!email) return toast.warning("lütfen mail adresinizi giriniz...");

    //şifre sıfırlama maili gönder
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Mailinize şifre sıfırlama bağlantısı gönderildi");
        close();
      })
      .catch(() => {
        toast.error("İşlem başarısız");
      });
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className="flex flex-col mx-auto gap-3 max-w-87.5 mt-5">
        <h1 className="text-3xl">Şifreni mi unuttun ?</h1>
        <p className="text-zinc-400">
          Email adresine bir şifre sıfırlama bağlantısı gönderilecek
        </p>
        <input
          ref={emailInputRef}
          type="email"
          required
          className="input mt-10"
          placeholder="mailinizi giriniz."
        />
        <button
          onClick={handleClick}
          type="button"
          className="bg-white hover:bg-gray-300 transition text-black rounded-full mt-8 py-1"
        >
          Şifre Sıfırlama maili gönder
        </button>

        <button
          type="button"
          className="bg-zinc-600 hover:bg-zinc-700 transition text-white rounded-full mt-2 py-1"
        >
          İptal
        </button>
      </div>
    </Modal>
  );
};

export default ResetModal;
