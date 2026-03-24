import Loader from ".";

const PageLoader = () => {
  return (
    <div className="h-screen bg-black grid place-items-center ">
      <Loader designs="text-white text-xl" />
    </div>
  );
};

export default PageLoader;
