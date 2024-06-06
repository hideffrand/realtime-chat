import SubHeading from "../atoms/SubHeading";
import ProfilePicture from "../atoms/ProfilePicture";
import { IUser } from "@/types";
import { useSearch } from "@/hook/useSearch";

export default function UserSearchResult({ photoUrl, username, id }: IUser) {
  const { setResults } = useSearch();

  function handleClick() {
    setResults([]);
  }
  return (
    <button
      onClick={() => handleClick()}
      className={`w-full p-2 flex gap-4 items-center rounded-[6px] hover:bg-gray-light`}
    >
      <ProfilePicture src={photoUrl} />
      <div className="flex flex-col items-start w-full">
        <SubHeading text={username} />
      </div>
    </button>
  );
}
