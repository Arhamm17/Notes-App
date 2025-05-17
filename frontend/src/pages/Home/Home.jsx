import { useEffect, useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import EmptyCard from "../../components/EmptyCard/EmptyCard";

const Home = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      setUserInfo(currentUser?.rest);
      getAllNotes();
    }
  }, [currentUser, navigate]);

  const getAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/all", {
        withCredentials: true,
      });

      if (res.data.success === false) {
        console.log(res.data);
        return;
      }

      setAllNotes(res.data.notes);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch notes");
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const deleteNote = async (data) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/note/delete/${data._id}`,
        { withCredentials: true }
      );

      if (res.data.success === false) {
        throw new Error(res.data.message);
      }

      toast.success("Note deleted successfully");
      getAllNotes();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSearchNote = async (query) => {
    if (!query.trim()) {
      handleClearSearch();
      return;
    }

    setSearchQuery(query);
    try {
      const res = await axios.get("http://localhost:3000/api/note/search", {
        params: { query },
        withCredentials: true,
      });

      if (res.data.success === false) {
        throw new Error(res.data.message);
      }

      setIsSearch(true);
      setAllNotes(res.data.notes);
    } catch (error) {
      toast.error(error.message);
      handleClearSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/note/update-note-pinned/${noteData._id}`,
        { isPinned: !noteData.isPinned },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        throw new Error(res.data.message);
      }

      toast.success(
        noteData.isPinned ? "Note unpinned" : "Note pinned successfully"
      );
      getAllNotes();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: "#65393a" }} // Puce background
      >
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4"
          style={{ borderColor: "#e18b43 transparent" }} // Gold spinner color
        ></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#65393a" /* Puce background */ }}
    >
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
        searchQuery={searchQuery}
        // Customize Navbar colors inside Navbar if needed
      />

      <div className="container mx-auto px-4 py-8">
        {allNotes.length > 0 ? (
          <>
            {/* Pinned notes section */}
            {allNotes.some((note) => note.isPinned) && (
              <div className="mb-8">
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#e18b43" /* Gold heading */ }}
                >
                  Pinned Notes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {allNotes
                    .filter((note) => note.isPinned)
                    .map((note) => (
                      <NoteCard
                        key={note._id}
                        {...note}
                        onEdit={() => handleEdit(note)}
                        onDelete={() => deleteNote(note)}
                        onPinNote={() => updateIsPinned(note)}
                        colorScheme={{
                          background: "#414a45", // Charcoal background
                          textColor: "#f0efe0", // Ivory text
                        }}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* All notes section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allNotes
                .filter((note) => !note.isPinned)
                .map((note) => (
                  <NoteCard
                    key={note._id}
                    {...note}
                    onEdit={() => handleEdit(note)}
                    onDelete={() => deleteNote(note)}
                    onPinNote={() => updateIsPinned(note)}
                    colorScheme={{
                      background: "#414a45", // Charcoal background
                      textColor: "#f0efe0", // Ivory text
                    }}
                  />
                ))}
            </div>
          </>
        ) : (
          <EmptyCard
            imgSrc={
              isSearch
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtakcQoMFXwFwnlochk9fQSBkNYkO5rSyY9A&s"
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDCtZLuixBFGTqGKdWGLaSKiO3qyhW782aZA&s"
            }
            message={
              isSearch
                ? "No notes found matching your search"
                : "Ready to capture your ideas? Click the '+' button to create your first note!"
            }
            style={{ color: "#e18b43" /* Gold text for empty message */ }}
          />
        )}
      </div>

      {/* Add note button */}
      <button
        className="fixed bottom-8 right-8 w-16 h-16 flex items-center justify-center rounded-full shadow-lg transition-all"
        style={{ backgroundColor: "#e18b43", color: "#f0efe0" }} // Gold bg, Ivory text
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
        aria-label="Add new note"
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#f0efe0")
        } // Ivory hover bg
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#e18b43")
        }
      >
        <MdAdd className="text-2xl" style={{ color: "#65393a" }} />{" "}
        {/* Puce icon */}
      </button>

      {/* Add/Edit Note Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(101, 57, 58, 0.8)", // Puce semi-transparent overlay
            zIndex: 1000,
          },
          content: {
            maxWidth: "600px",
            margin: "auto",
            borderRadius: "12px",
            padding: "0",
            border: `1px solid #e18b43`, // Gold border
            boxShadow: "0 10px 25px rgba(225, 139, 67, 0.3)", // Gold shadow
            backgroundColor: "#414a45", // Charcoal background
            color: "#f0efe0", // Ivory text
          },
        }}
        ariaHideApp={false}
      >
        <AddEditNotes
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </div>
  );
};

export default Home;
