import PostForm from "../post-form";

const Main = ({ user }) => {
  return (
    <div className="border-x border-tw-gray overflow-y-auto main-container">
      <header className="border-b border-tw-gray font-bold p-4 ">
        Anasayfa
      </header>
      <PostForm user={user} />
    </div>
  );
};

export default Main;
