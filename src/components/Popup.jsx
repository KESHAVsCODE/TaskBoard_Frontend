/* eslint-disable react/prop-types */
const Popup = ({ message, showPopup }) => {
  return (
    <div
      className={`flex justify-center fixed top-0 left-0 right-0 py-3 bg-transparent text-white
       ${showPopup ? "" : "-translate-y-[100%]"}
         transition-transform  delay-300`}
    >
      <p className="px-4 py-2 text-center font-semibold text-green-500  bg-[#222] rounded">
        {message}
      </p>
    </div>
  );
};

export default Popup;
