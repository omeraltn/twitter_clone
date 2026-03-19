const TextArea = () => {
  return (
    <textarea
      name="content"
      className="w-full mb-2 md:text-lg text-zinc-300 outline-none resize-y min-h-10 max-h-75"
      placeholder="Neler Oluyor?"
    />
  );
};

export default TextArea;
