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
        className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="flex items-center justify-between">
          <div>
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-green-700">
              {moment(date).format("Do MMM YYYY")}
            </span>
          </div>

          <MdOutlinePushPin
            className={`icon-btn ${
              isPinned ? "text-[#2B85FF]" : "text-slate-300"
            }`}
            onClick={(e) => {
              stopPropagation(e);
              onPinNote();
            }}
          />
        </div>

        <div
          className="text-xs text-slate-600 mt-2 max-h-12 overflow-hidden whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-slate-500">
            {tags.map((item) => `#${item} `)}
          </div>

          <div className="flex items-center gap-2">
            <MdCreate
              className="icon-btn hover:text-green-600"
              onClick={(e) => {
                stopPropagation(e);
                onEdit();
              }}
            />

            <MdDelete
              className="icon-btn hover:text-red-500"
              onClick={(e) => {
                stopPropagation(e);
                onDelete();
              }}
            />
          </div>
        </div>
      </div>

      {/* Modal popup */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
          onClick={() => setShowModal(false)}
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="bg-white rounded-md p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                <MdClose size={24} />
              </button>

              <h2 className="text-xl font-semibold mb-2 pr-8">{title}</h2>
              <p className="text-sm text-green-700 mb-4">
                {moment(date).format("Do MMM YYYY, h:mm A")}
              </p>
              <div
                className="text-sm text-gray-700 whitespace-pre-wrap mb-4"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <div className="text-xs text-slate-500">
                {tags.length > 0
                  ? tags.map((tag) => `#${tag} `)
                  : "No tags available"}
              </div>
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
