import { deleteObject, ref } from "firebase/storage";
import { storage } from ".";
import { toast } from "react-toastify";

const deleteFile = async (mediaUrl) => {
  if (!mediaUrl) return;
  // https://firebasestorage.googleapis.com/v0/b/twitter-app-a9397.firebasestorage.app/o/post-media%2Fb22ec657-815d-463f-bdfb-14c3a830d97cJBl%20Clone%202026-02-26%20at%202.47.09%20PM.jpg?alt=media&token=a09ba10b-34ba-4d40-955a-e2990f08770e

  try {
    //urldeki karakter kodlarını normale çevir %2f === / | %20 === " "
    const normalUrl = decodeURIComponent(mediaUrl);

    //https://firebasestorage.googleapis.com/v0/b/twitter-app-a9397.firebasestorage.app/o/post-media/b22ec657-815d-463f-bdfb-14c3a830d97cJBl

    //urlden dosya yolunu çıkar
    const startIndex = normalUrl.indexOf("/o/") + 3;
    const endIndex = normalUrl.indexOf("?");
    const path = normalUrl.slice(startIndex, endIndex);

    //silinecek dosyanın referansını al
    const fileRef = ref(storage, path);

    //medyayı sil
    await deleteObject(fileRef);
  } catch (error) {
    toast.error("Bir hata oluştu.");
  }
};

export default deleteFile;
