//medya içeriklerini kontrol edip desteklenen tipteki medyaları storage yükle

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from ".";
import { v4 } from "uuid";

//storage a yüklenen medyanın url ini return eden fonksiyon

const uploadFile = async (file) => {
  //1- dosya yoksa durdur
  if (!file) return null;

  //2- dosya formatı resim video ses değilse yüklemeye izin verme
  if (
    !file.type.startsWith("image") &&
    !file.type.startsWith("video") &&
    !file.type.startsWith("audio")
  ) {
    throw new Error("Medya tipi desteklenmiyor");
  }

  //3- dosya boyutu 20mb üzerindeyse yüklemeye izin verme
  if (file.size > 20000000) {
    throw new Error("Medya boyutu sınırı aşıyor(20mb)");
  }

  //4 medyanın yükleneceğii konumun referansını al (klasör/isim)
  const mediaRef = ref(storage, `post-media/${v4()}${file.name}`);

  //5 medyayı storage yükle

  await uploadBytes(mediaRef, file);

  //6- yüklenen medyanın url ini döndür
  const url = getDownloadURL(mediaRef);
  return url;
};

export default uploadFile;
