import { BsThreeDots } from "react-icons/bs";
import { auth, db } from "../../firebase";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import deleteFile from "../../firebase/delete-file";
import EditModal from "../modal/edit-modal";

const Dropdown = ({ tweet }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //tweet'i gönderen kişiyle şuan oturumu açık olan kişi aynı mı ?
  const isOwn = tweet.user.id === auth.currentUser.uid;

  //silme butonuna tıklaninca

  const handleDelete = async () => {
    //kullanıcının onayını al
    if (!confirm("Silmek istediğinizden emin misiniz ?")) return;

    //dökümanın referansını al
    const docRef = doc(db, "tweets", tweet.id);

    //tweeitin medya içeriği varsa storagedan sil
    if (tweet.content.media) {
      await deleteFile(tweet.content.media);
    }

    //tweeti kaldır
    await deleteDoc(docRef);
  };

  //tweeti başkası attıysa butonu gösterme
  if (!isOwn) return;

  return (
    <>
      <div className="relative">
        <button onClick={() => setIsOpen(!isOpen)}>
          <BsThreeDots className="text-zinc-400" />
        </button>
        {isOpen && (
          <div className="absolute bg-zinc-700/50 -inset-e-1 rounded-lg z-99 backdrop-blur-lg shadow-lg ">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsOpen(false);
              }}
              className="flex items-center gap-5 px-4 py-2 border-b border-zinc-500"
            >
              <MdEdit />
              <span className="text-sm">Düzenle</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-5 px-4 py-2 border-b border-zinc-500"
            >
              <MdDelete />
              <span className="text-sm">Sil</span>
            </button>
          </div>
        )}
      </div>

      <EditModal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        tweet={tweet}
      />
    </>
  );
};

export default Dropdown;
