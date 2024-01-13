/* eslint-disable react/prop-types */
const Popup = ({ message, showPopup }) => {
  return (
    <div
      className={`flex justify-center fixed top-0 left-0
       right-0 p-4 bg-transparent text-white
       ${showPopup ? "" : "-translate-y-[100%]"}
         transition-transform  delay-300`}
    >
      <p className="text-center text-green-500 border-green-500 px-4 py-2 border rounded   ">
        {message}
      </p>
    </div>
  );
};

export default Popup;
