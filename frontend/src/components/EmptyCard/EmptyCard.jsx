import PropTypes from "prop-types"; // Import PropTypes

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={imgSrc} alt="No notes" className="w-60" />

      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

// Define PropTypes for the component
EmptyCard.propTypes = {
  imgSrc: PropTypes.string.isRequired, // imgSrc should be a string and is required
  message: PropTypes.string.isRequired, // message should be a string and is required
};

export default EmptyCard;
