import { FaUserCircle } from "react-icons/fa"; // For the bot avatar icon

/* eslint-disable react/prop-types */
export default function ChatField({ index, isFromUser, text, url }) {
  return (
    <>
      <div
        key={index}
        className={`flex items-start ${
          isFromUser ? "justify-end" : "justify-start"
        }`}
      >
        {!isFromUser && (
          <FaUserCircle className="text-3xl text-blue-400 mr-3" />
        )}
        <div
          className={`max-w-[70%] p-3 break-words rounded-3xl shadow-sm ${
            isFromUser ? "bg-blue-500 text-white ml-auto rounded-br-md" : "bg-slate-700 text-white mr-auto rounded-bl-md"
          }`}
        >
          {url ? ( // If there is an image URL, render the image
            <img
              src={url}
              className="w-80 transition-transform hover:scale-105"
            />
          ) : (
            <p className="text-2xl">{text}</p> // Otherwise, render the text message
          )}
        </div>
      </div>
    </>
  );
}
