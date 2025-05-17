import { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);
  const contentRef = useRef();

  const getContent = () => contentRef.current.innerHTML;

  const applyCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    contentRef.current.focus();
  };

  const editNote = async () => {
    const content = getContent();
    const noteId = noteData._id;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/note/edit/" + noteId,
        { title, content, tags },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  const addNewNote = async () => {
    const content = getContent();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/note/add",
        { title, content, tags },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  const handleAddNote = () => {
    const content = getContent();

    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content || content === "<br>") {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative max-h-[80vh] overflow-y-auto p-4 bg-[#f0efe0] rounded-lg shadow-md">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-[#e18b43]/20 transition"
        onClick={onClose}
      >
        <MdClose className="text-xl text-[#414a45]" />
      </button>

      {/* TITLE */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-[#e18b43] uppercase">
          Title
        </label>
        <input
          type="text"
          className="text-2xl text-[#65393a] bg-transparent outline-none border-b border-[#e18b43] placeholder:text-[#65393a]/50"
          placeholder="Wake up at 6 a.m."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-xs font-bold text-[#e18b43] uppercase">
          Content
        </label>

        {/* Rich Text Area */}
        <div
          ref={contentRef}
          className="text-sm text-[#65393a] outline-none bg-[#fffaf1] border border-[#e18b43] p-3 rounded min-h-[160px] max-h-[200px] overflow-y-auto"
          contentEditable
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: noteData?.content || "" }}
        ></div>

        {/* Formatting Buttons */}
        <div className="flex gap-2 my-2">
          {["bold", "italic", "underline"].map((cmd) => (
            <button
              key={cmd}
              className="text-xs px-3 py-1 rounded bg-[#e18b43] text-white hover:bg-[#d57a36] transition"
              onClick={() => applyCommand(cmd)}
            >
              {cmd.charAt(0).toUpperCase() + cmd.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* TAGS */}
      <div className="mt-3">
        <label className="text-xs font-bold text-[#e18b43] uppercase">
          Tags
        </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      {/* Submit Button */}
      <button
        className="mt-5 w-full py-3 bg-[#414a45] text-[#f0efe0] rounded hover:bg-[#2e3430] transition font-semibold"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

AddEditNotes.propTypes = {
  onClose: PropTypes.func.isRequired,
  noteData: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  getAllNotes: PropTypes.func.isRequired,
};

export default AddEditNotes;
