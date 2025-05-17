import PropTypes from "prop-types";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef } from "react";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const inputRef = useRef(null);

  // Focus the input when component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-40 sm:w-60 md:w-80 flex items-center px-4 bg-slate-100 rounded-md transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search Notes..."
        className="w-full text-sm bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        aria-label="Search notes"
      />

      <div className="flex items-center space-x-2">
        {value && (
          <button
            onClick={onClearSearch}
            className="text-slate-500 hover:text-black transition-colors"
            aria-label="Clear search"
          >
            <IoMdClose className="text-xl" />
          </button>
        )}

        <button
          onClick={handleSearch}
          className="text-slate-500 hover:text-black transition-colors"
          aria-label="Search"
        >
          <FaMagnifyingGlass className="text-xl" />
        </button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};

export default SearchBar;
