import { useState } from "react";

const UserAvatar = ({ url, name }) => {
  const [imgSrc, setImgSrc] = useState(
    url ? `https://images.weserv.nl/?url=${encodeURIComponent(url)}` : null,
  );

  return (
    <img
      src={imgSrc}
      alt={name}
      className="size-8.75 md:size-11.25 rounded-full"
      referrerPolicy="no-referrer"
      onError={() =>
        setImgSrc(
          `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        )
      }
    />
  );
};

export default UserAvatar;
