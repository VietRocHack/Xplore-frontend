import { FaUserCircle } from "react-icons/fa"; // For the bot avatar icon
import styles from "./page.module.css";

/* eslint-disable react/prop-types */
export default function ChatField({ index, isFromUser, text, url }) {
  return (
    <>
      <div
        key={index}
        className={`${styles.chat_container} ${
          isFromUser ? styles.chat_container_end : styles.chat_container_start
        }`}
      >
        {!isFromUser && <FaUserCircle className={styles.user_icon} />}
        <div
          className={`${styles.message_container} ${
            isFromUser ? styles.message_from_user : styles.message_from_others
          }`}
        >
          {url ? ( // If there is an image URL, render the image
            <img src={url} className={styles.message_image} />
          ) : (
            <p className={styles.message_text}>{text}</p> // Otherwise, render the text message
          )}
        </div>
      </div>
    </>
  );
}
