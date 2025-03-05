import { CiSearch } from "react-icons/ci";

const LibrarySearchBar = () => {
  return (
    <div className="flex mt-3 justify-between border-solid border-gray-300 border-[1px] items-center w-2/3">
      <div className="flex items-center">
        <CiSearch className="ml-4 text-2xl" />
        <input
          className=" p-2 rounded-sm w-2/3 focus:outline-none"
          type="text"
          placeholder="Search in my library"
        />
      </div>

      <button className=" p-3 bg-green-400 text-white hover:bg-green-500">
        Search
      </button>
    </div>
  );
};

export default LibrarySearchBar;
