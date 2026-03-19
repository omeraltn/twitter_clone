import UserAvatar from "../shared/user-avatar";
import FormActions from "./form-actions";
import TextArea from "./text-area";

const PostForm = ({ user }) => {
  return (
    <div className="border-b border-tw-gray p-4 flex gap-5">
      <UserAvatar url={user?.photoURL} name={user?.displayName} />

      <form className="w-full pt-1">
        <TextArea />
        <FormActions />
      </form>
    </div>
  );
};

export default PostForm;
