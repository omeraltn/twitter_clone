import { toast } from "react-toastify";
import Modal from "./index";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import Loader from "../loader";
import deleteFile from "../../firebase/delete-file";
import uploadFile from "../../firebase/upload-file";

const EditModal = ({ isOpen, close, tweet }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMediaDeleting, setIsMediaDeleting] = useState(false);

  //form gonderilirken
  const handleSubmit = async (e) => {
    e.preventDefault();

    //inputtan veriyi al
    const text = e.target.text.value.trim();
    const file = e.target.media?.files[0];
    const fileType = file?.type?.split("/")?.[0];

    //veri boşsa hata ver
    const willHaveMedia = !isMediaDeleting && (file || tweet.content.media);
    if (!text && !willHaveMedia) return toast.warning("İçerik boş olamaz");

    try {
      setIsLoading(true);
      //güncellenecek veri
      let updateData = {
        "content.text": text,
        isEdited: true,
      };

      //medya silinecekse güncellenicek veriyi değiştir
      if (isMediaDeleting) {
        updateData["content.mediaType"] = null;
        updateData["content.media"] = null;
        //eski medyayı storagedan sil
        await deleteFile(tweet.content.media);
      }

      //eğer yeni dosya seçildiyse onu storage'a yükle
      if (file) {
        const mediaUrl = await uploadFile(file);
        updateData["content.media"] = mediaUrl;
        updateData["content.mediaType"] = fileType;
      }

      // güncellenecek belgenin referansını al
      const docRef = doc(db, "tweets", tweet.id);

      //belgeyi güncelle
      await updateDoc(docRef, updateData);

      //modalı kapat
      setIsMediaDeleting(false);
      close();
    } catch (error) {
      toast.warning(`hata : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      close={() => {
        close();
        setIsMediaDeleting(false);
      }}
    >
      <h1 className="text-2xl">Tweet'i Düzenle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-10 min-w-[90%]">
        <label className="text-sm mb-3 text-zinc-400">Metne Değiştir</label>
        <textarea
          defaultValue={tweet.content.text}
          name="text"
          className="resize-y min-h-20 max-h-62.5 bg-black text-secondary border border-zinc-700 rounded-md p-3 outline-none scroll-auto "
        ></textarea>

        <label className="text-sm mt-8 mb-3  text-zinc-400">
          Medyayı Değiştir
        </label>

        {tweet.content.media && !isMediaDeleting ? (
          <button
            onClick={() => setIsMediaDeleting(true)}
            type="button"
            className="submit-button font-semibold tracking-tight"
          >
            Medyayı kaldır
          </button>
        ) : (
          <input
            type="file"
            name="media"
            className="border border-zinc-700 p-3 rounded-md outline-none"
          />
        )}

        <div className="flex justify-end gap-5 mt-10">
          <button onClick={() => close()} type="button">
            Vazgeç
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="submit-button tracking-tight font-semibold"
          >
            {isLoading ? <Loader /> : "Kaydet"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
