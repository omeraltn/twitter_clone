import UserAvatar from "../shared/user-avatar";
import Buttons from "./buttons";
import Content from "./content";
import Dropdown from "./dropdown";
import UserInfo from "./user-info";

const Post = ({ tweet }) => {
  return (
    <div className="border-b border-tw-gray p-4 flex gap-2">
      <UserAvatar name={tweet.user.name} url={tweet.user.photo} />
      <div className="w-full flex flex-col gap-1 ">
        <div className="flex justify-between">
          <UserInfo tweet={tweet} />
          <Dropdown tweet={tweet} />
        </div>
        <Content data={tweet.content} />

        <Buttons tweet={tweet} />
      </div>
    </div>
  );
};

export default Post;
