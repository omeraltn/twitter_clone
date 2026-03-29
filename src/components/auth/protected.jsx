import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";
import PageLoader from "../loader/page-loader";
import { toast } from "react-toastify";

const Protected = () => {
  //oturumu açık kullanıcı statei
  const [user, setUser] = useState(undefined);

  //oturum verisine abone ol
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (activeUser) => setUser(activeUser));

    return () => {
      unsub();
    };
  }, []);

  // veri Yüklenene kadar loader bas

  if (user === undefined) return <PageLoader />;
  //kullanıcı oturumu kapalıysa veya email doğrulanmamışsa logine yönlendir
  if (user === null || user?.emailVerified === false) {
    if (user?.emailVerified === false) toast.info("Mailinizi doğrulayın");

    //auth sayfasına yönlendir
    return <Navigate to={"/"} />;
  }

  //oturum açıksa sayfayı göster
  return <Outlet context={user} />;
};

export default Protected;
