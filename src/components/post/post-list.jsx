import { useEffect, useState } from "react";
import Post from ".";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../loader";

const PostList = () => {
  const [tweets, setTweets] = useState(undefined);

  useEffect(() => {
    //kolleksiyon referansını al
    const collectionRef = collection(db, "tweets");

    //sorgu ayarları yap
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    //tweets kolleksiyonuna abone ol
    const unsub = onSnapshot(q, (snapshot) => {
      //state e gönderilmeden önce geçici olarak tutacağımız dizi
      const temp = [];

      //veritabanından gelen belgelerin verilerine eriş
      snapshot.docs.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() });
      });

      //tweets state ini güncelle
      setTweets(temp);
    });

    //bileşen ekrandan ayrılınca aboneliği durdur
    return () => {
      unsub();
    };
  }, []);

  if (tweets === undefined) return <Loader designs={"my-20"} />;

  if (tweets.length === 0)
    return (
      <div className="my-40 grid place-items-center ">
        <p className="text-zinc-400">Henüz hiç tweet atılmadı.</p>
      </div>
    );
  return tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />);
};

export default PostList;
