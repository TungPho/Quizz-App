import { CiSearch } from "react-icons/ci";

const LibrarySearchBar = () => {
  return (
    <div className="flex mt-3 border-solid border-gray-300 border-[1px] items-center w-1/2">
      <CiSearch className="ml-4 text-2xl" />
      <input
        className=" p-2 rounded-sm w-2/3 focus:outline-none"
        type="text"
        placeholder="Search in my library"
      />
    </div>
  );
};

export default LibrarySearchBar;
