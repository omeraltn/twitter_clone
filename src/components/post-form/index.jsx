import { toast } from "react-toastify";
import UserAvatar from "../shared/user-avatar";
import FormActions from "./form-actions";
import TextArea from "./text-area";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/index";
import uploadFile from "../../firebase/upload-file";

const PostForm = ({ user }) => {
  //form gönderilince
  const handleSubmit = async (e) => {
    e.preventDefault();
    //inputlardaki verileri al
    const text = e.target.content.value.trim();
    const file = e.target.media.files[0];

    //girdi  yoksa bildirim gönder
    if (!text && !file) return toast.warning("Lütfen içeriği giriniz");

    //veritabanına yeni tweeti kaydet
    try {
      //medyayı storage'a yükle
      const mediaUrl = await uploadFile(file);
      console.log(mediaUrl);
      return;

      //kolleksiyonun referansını al
      const collectionRef = collection(db, "tweets");

      // belgeyi kolleksiyon kaydeyt
      await addDoc(collectionRef, {
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
        content: {
          text,
          media: null,
          mediaType: null,
        },
        isEdited: false,
        likes: [],
        createdAt: serverTimestamp(),
      });
      //bildirim gönder ve sıfırla
      toast.success("Gönderi Paylaşıldı");
      e.target.reset();
    } catch (error) {
      toast.error("Hata!" + error.message);
    }
  };

  return (
    <div className="border-b border-tw-gray p-4 flex gap-5">
      <UserAvatar url={user?.photoURL} name={user?.displayName} />

      <form onSubmit={handleSubmit} className="w-full pt-1">
        <TextArea />
        <FormActions />
      </form>
    </div>
  );
};

export default PostForm;
