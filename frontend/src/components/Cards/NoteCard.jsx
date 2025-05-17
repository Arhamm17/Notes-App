import { useState } from "react";
import { MdCreate, MdDelete, MdOutlinePushPin, MdClose } from "react-icons/md";
import moment from "moment";
import PropTypes from "prop-types";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onPinNote,
  onEdit,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className="border rounded p-4 cursor-pointer transition-shadow ease-in-out hover:shadow-lg"
        style={{
          backgroundColor: "#f0efe0", // Ivory background
          borderColor: "#65393a", // Puce border
          color: "#414a45", // Charcoal text by default
        }}
        onClick={handleCardClick}
      >
        <div className="flex items-center justify-between">
          <div>
            <h6
              className="text-sm font-semibold"
              style={{ color: "#65393a" }} // Puce title
            >
              {title}
            </h6>
            <span
              className="text-xs"
              style={{ color: "#e18b43" }} // Gold date
            >
              {moment(date).format("Do MMM YYYY")}
            </span>
          </div>

          <MdOutlinePushPin
            className="cursor-pointer"
            size={20}
            style={{
              color: isPinned ? "#e18b43" : "#65393a", // Gold if pinned else Puce
              transition: "color 0.3s",
            }}
            onClick={(e) => {
              stopPropagation(e);
              onPinNote();
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#e18b43"; // Gold on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isPinned ? "#e18b43" : "#65393a";
            }}
            aria-label={isPinned ? "Unpin note" : "Pin note"}
          />
        </div>

        <div
          className="text-xs mt-2 max-h-12 overflow-hidden whitespace-pre-wrap"
          style={{ color: "#414a45" }} // Charcoal content text
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="flex items-center justify-between mt-2">
          <div
            className="text-xs"
            style={{ color: "#65393a" }} // Puce tags
          >
            {tags.map((item, idx) => (
              <span key={idx} className="mr-1">{`#${item}`}</span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <MdCreate
              className="cursor-pointer"
              size={18}
              style={{ color: "#65393a", transition: "color 0.3s" }}
              onClick={(e) => {
                stopPropagation(e);
                onEdit();
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e18b43")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#65393a")}
              aria-label="Edit note"
            />

            <MdDelete
              className="cursor-pointer"
              size={18}
              style={{ color: "#65393a", transition: "color 0.3s" }}
              onClick={(e) => {
                stopPropagation(e);
                onDelete();
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e18b43")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#65393a")}
              aria-label="Delete note"
            />
          </div>
        </div>
      </div>

      {/* Modal popup */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center"
          style={{ backgroundColor: "rgba(65, 74, 69, 0.75)" }} // Charcoal semi-transparent overlay
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-md p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: "#f0efe0", // Ivory modal background
              color: "#414a45", // Charcoal text
              boxShadow: "0 8px 24px rgba(101, 57, 58, 0.4)", // Puce shadow
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3"
              style={{ color: "#65393a" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e18b43")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#65393a")}
              aria-label="Close"
            >
              <MdClose size={24} />
            </button>

            <h2
              className="text-xl font-semibold mb-2 pr-8"
              style={{ color: "#65393a" }} // Puce modal title
            >
              {title}
            </h2>
            <p
              className="text-sm mb-4"
              style={{ color: "#e18b43" }} // Gold modal date
            >
              {moment(date).format("Do MMM YYYY, h:mm A")}
            </p>
            <div
              className="text-sm whitespace-pre-wrap mb-4"
              style={{ color: "#414a45" }} // Charcoal modal content
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div
              className="text-xs"
              style={{ color: "#65393a" }} // Puce modal tags
            >
              {tags.length > 0
                ? tags.map((tag, idx) => (
                    <span key={idx} className="mr-1">{`#${tag}`}</span>
                  ))
                : "No tags available"}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPinned: PropTypes.bool.isRequired,
  onPinNote: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteCard;
