import { getUserName } from "../../utils/helpers";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import relativeTime from "dayjs/plugin/relativeTime";
import { MdEdit } from "react-icons/md";
dayjs.extend(relativeTime);

const UserInfo = ({ tweet }) => {
  //tarihi date formatına çevir
  let date = tweet.createdAt?.toDate();

  //oluşturulan tarih üzerinden ne kadart geçti
  date = dayjs(date).locale("tr").fromNow(true);

  return (
    <div className="flex items-center gap-2 whitespace-nowrap text-zinc-400 ">
      <p className="text-white font-semibold">{tweet.user.name}</p>
      <p className="text-sm">{getUserName(tweet.user.name)}</p>
      <p className="text-xs">{date}</p>
      {tweet.isEdited && (
        <div>
          <MdEdit className="md:hidden" />
          <span className="max-md:hidden text-xs ">* düzenlendi</span>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
