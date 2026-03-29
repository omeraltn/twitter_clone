import { FaDoorOpen } from "react-icons/fa";
import { navSections } from "../../utils/constant";
import { getUserName } from "../../utils/helpers";
import UserAvatar from "../shared/user-avatar";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Nav = ({ user }) => {
  return (
    <div className="flex flex-col justify-between items-end px-2 py-4">
      {/* Üst Kısım */}
      <div>
        <img src="/x-logo.webp" alt="x" className="w-14 mb-4" />
        {navSections.map((item, key) => (
          <button
            key={key}
            className="flex items-center gap-3 text-2xl lg:text-xl p-3 rounded-lg hover:bg-tw-gray w-full"
          >
            {item.icon}

            <span className="whitespace-nowrap max-lg:hidden text-base">
              {item.title}
            </span>
          </button>
        ))}
      </div>
      {/* alt kısım  */}
      <div className="flex max-lg:flex-col gap-4 max-lg:items-center justify-between">
        <div className="flex gap-2">
          <UserAvatar url={user?.photoURL} name={user?.displayName} />
          <div>
            <p className="max-lg:hidden text-sm">{user?.displayName}</p>
            <p className="max-lg:hidden text-sm text-zinc-400">
              {getUserName(user?.displayName)}
            </p>
          </div>
        </div>
        <button
          type="button"
          title="Çıkış Yap"
          onClick={() => {
            signOut(auth);
            toast.warn("Oturumunuz kapatıldı.");
          }}
        >
          <FaDoorOpen className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Nav;
