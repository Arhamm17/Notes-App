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
    <div className="relative max-h-[80vh] overflow-y-auto p-4">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      {/* TITLE */}
      <div className="flex flex-col gap-2">
        <label className="input-label text-red-400 uppercase">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Wake up at 6 a.m."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label text-red-400 uppercase">Content</label>

        {/* Rich Text Area with scroll */}
        <div
          ref={contentRef}
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded min-h-[160px] max-h-[200px] overflow-y-auto"
          contentEditable
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: noteData?.content || "" }}
        ></div>

        {/* Formatting Buttons */}
        <div className="flex gap-2 my-2">
          <button
            className="text-sm px-2 py-1 bg-slate-200 rounded hover:bg-slate-300"
            onClick={() => applyCommand("bold")}
          >
            Bold
          </button>
          <button
            className="text-sm px-2 py-1 bg-slate-200 rounded hover:bg-slate-300"
            onClick={() => applyCommand("italic")}
          >
            Italic
          </button>
          <button
            className="text-sm px-2 py-1 bg-slate-200 rounded hover:bg-slate-300"
            onClick={() => applyCommand("underline")}
          >
            Underline
          </button>
        </div>
      </div>

      {/* TAGS */}
      <div className="mt-3">
        <label className="input-label text-red-400 uppercase">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      {/* Submit Button */}
      <button
        className="btn-primary font-medium mt-5 p-3"
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
