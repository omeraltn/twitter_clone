import { FaHeart, FaRegComment, FaRegHeart, FaRetweet } from "react-icons/fa";
import { RiShare2Line } from "react-icons/ri";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../../firebase";

const Buttons = ({ tweet }) => {
  // aktif kullanıcı bu tweeti likleladı mı ?
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  //like butonuna tiklanınca
  const toggleLike = async () => {
    //güncellenecek belgenin referansını al
    const docRef = doc(db, "tweets", tweet.id);

    //isLiked true ise:  oturumu açık kullanıcı idsini likes dizisine ekle
    //isLiked false ise:  oturumu açık kullanıcı idsini likes dizisinden kaldır
    await updateDoc(docRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };
  return (
    <div className="flex justify-between items-center ">
      <button className="post-icon hover:text-blue-400  hover:bg-blue-400/20">
        <FaRegComment className="size-4 " />
      </button>
      <button className="post-icon hover:text-green-400  hover:bg-green-400/20">
        <FaRetweet className="size-4 " />
      </button>
      <button
        onClick={toggleLike}
        className={`post-icon hover:text-pink-400  hover:bg-pink-400/20 relative pe-7 ${isLiked && "text-pink-500"}`}
      >
        {isLiked ? (
          <FaHeart className="size-3.5" />
        ) : (
          <FaRegHeart className="size-4 " />
        )}
        <span className="absolute inset-e-2.5 top-2.5 w-3 text-sm">
          {tweet.likes.length}
        </span>
      </button>

      <button className="post-icon hover:text-blue-400  hover:bg-blue-400/20">
        <RiShare2Line className="size-4 " />
      </button>
    </div>
  );
};

export default Buttons;
