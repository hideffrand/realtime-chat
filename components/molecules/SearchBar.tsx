import { CiSearch } from "react-icons/ci";
import Icon from "../atoms/Icons";
import { handleSearch } from "./action";
import { useSearch } from "@/hook/useSearch";

export default function SearchBar() {
  const { setResults } = useSearch();

  async function handleSubmit(formData: FormData) {
    const data = await handleSearch(formData);
    if (!data) return;
    
    setResults([data]);
  }

  return (
    <form
      action={handleSubmit}
      className="w-full flex items-center gap-2 p-2 my-4 text-sm bg-gray-dark text-white border-b-2 border-green-secondary rounded-[4px]"
      style={{ colorScheme: "dark" }}
    >
      <Icon>
        <CiSearch />
      </Icon>
      <input
        type="text"
        name="query"
        className="bg-transparent w-full"
        placeholder="Search or start a new chat"
      />
    </form>
  );
}
