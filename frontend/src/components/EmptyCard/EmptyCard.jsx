import PropTypes from "prop-types";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4">
      <img
        src={imgSrc}
        alt="Empty state"
        className="w-60 max-w-full rounded-lg border border-[#e18b43] shadow-md"
      />

      <p className="mt-5 text-sm font-medium text-center leading-7 max-w-md text-[#65393a]">
        {message}
      </p>
    </div>
  );
};

EmptyCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default EmptyCard;
