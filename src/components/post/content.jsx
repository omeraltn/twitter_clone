const Content = ({ data }) => {
  return (
    <div className="my-2">
      {data.text && <p>{data.text}</p>}

      {data.media && data.mediaType === "image" ? (
        <img
          src={data.media}
          className="rounded-xl my-2 object-cover max-h-100"
        />
      ) : data.mediaType === "video" ? (
        <video
          src={data.media}
          className="w-full aspect-video my-2 rounded-xl"
          controls
          muted
        />
      ) : (
        data.mediaType === "audio" && (
          <audio src={data.media} className="w-full my-2" controls muted />
        )
      )}
    </div>
  );
};

export default Content;
