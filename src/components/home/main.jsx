import PostForm from "../post-form";
import PostList from "../post/post-list";

const Main = ({ user }) => {
  return (
    <div className="border-x border-tw-gray overflow-y-auto main-container">
      <header className="border-b border-tw-gray font-bold p-4 ">
        Anasayfa
      </header>
      <PostForm user={user} />
      <PostList />
    </div>
  );
};

export default Main;
