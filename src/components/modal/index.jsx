import { IoMdClose } from "react-icons/io";

//HOC:higher order Component
const Modal = ({ children, isOpen, close }) => {
  if (!isOpen) return;
  return (
    <div className="fixed inset-0  bg-zinc-800/50 backdrop-blur-sm z-999 grid place-items-center">
      <div className="bg-black py-10 px-8 w-3/4 max-w-125 rounded-md ">
        <div className="flex justify-end">
          <button type="button" onClick={close}>
            <IoMdClose className="text-3xl hover:text-gray-500" />
          </button>
        </div>
        {/* modal içeriği : prop olarak alıyoruz */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
