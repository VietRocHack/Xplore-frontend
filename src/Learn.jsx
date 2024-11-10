import female1 from "./assets/female1.png";
import female2 from "./assets/female2.png";
import female3 from "./assets/female3.png";
import female4 from "./assets/female4.png";
import female5 from "./assets/female5.png";
import male1 from "./assets/male1.png";
import male2 from "./assets/male2.png";
import male3 from "./assets/male3.png";
import male4 from "./assets/male4.png";
import male5 from "./assets/male5.png";
import teacher from "./assets/teacher.png";
import laufey from "./assets/laufey.gif";
import chjlaucute from "./assets/chjlaucute.jpg";
import cutevaichuong from "./assets/cutevaichuong.jpg";

import { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import Vapi from "@vapi-ai/web";
import { VAPI_KEY } from "./utils";
import ChatBox from "./components/ChatBox";
import CircleButton from "./components/CircleButton";
import styles from "./page.module.css";
import backIcon from "/BackIcon.svg";
import nextIcon from "/NextIcon.svg";
import { data } from "autoprefixer";
import { FaRProject } from "react-icons/fa";

const fixText =
  "isuem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt quos itaque asperiores. Enim iure rerum sunt molestiae repellat veritatis exercitationem dolorem placeat deleniti natus quibusdam, in beatae consectetur omnis aliquid.";
const quotes = [
  "Unlock the door to endless discovery",
  "Every click is a step closer to wisdom",
  "Tap into your potential and let curiosity lead",
  "Your journey to knowledge begins here",
  "Empower yourself with every question you ask",
];
const dataMock = [
  { image: female1, description: fixText + "1" },
  { image: female2, description: fixText + "2" },
  { image: female3, description: fixText + "3" },
  { image: female4, description: fixText + "4" },
  { image: female5, description: fixText + "5" },
  { image: male1, description: fixText + "6" },
  { image: male2, description: fixText + "7" },
  { image: male3, description: fixText + "8" },
  { image: male4, description: fixText + "9" },
  { image: male5, description: fixText + "10" },
  { image: teacher, description: fixText + "11" },
  { image: laufey, description: fixText + "12" },
  { image: chjlaucute, description: fixText + "13" },
  { image: cutevaichuong, description: fixText + "14" },
];

const Learn = () => {
  const [vapi, setVapi] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false); // New state for chat visibility
  const [quoteIndex, setQuoteIndex] = useState(0); // Track current quote index
  const [init, setInit] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // TODO: @VuDuc, you can start integrating from here
  const [isHelpQuestion, setIsHelpQuestion] = useState(true); // TODO: We mock data and set it to true for now. By default it is false.

  const handleHelpQuestion = () => {
    // TODO: @VuDuc, this one is for help questions
    setIsHelpQuestion(true);
  };

  const handleGeneralQuestion = () => {
    // TODO: @VuDuc, this one is for any other questions
    setIsHelpQuestion(false);
  };
  // Remember to reset the array containing the steps before jumping in to the next "help" question

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dataMock.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? dataMock.length - 1 : prevIndex - 1
    );
  };

  const handleMuteToggle = () => {
    if (vapi) {
      setIsMuted(!isMuted);
      vapi.setMuted(!isMuted);
    }
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
  };

  const startCallInline = () => {
    // vapi.start(assistantOptions); //from the website
    setIsVoiceMode(!isVoiceMode);
    setIsChatVisible(true); // Show chat section
    setInit(true);
    vapi.start("4b6c564d-7931-4227-b2f3-cbafd3c263c1");
  };

  const endCall = () => {
    setIsVoiceMode(false);
    vapi.stop();
  };

  useEffect(() => {
    const vapiInstance = new Vapi(VAPI_KEY);
    setVapi(vapiInstance);

    // vapiInstance.setMuted(!isMuted)

    console.log("starting hooks");
    vapiInstance.on("call-start", () => {
      handleMuteToggle();
      setConnected(true);
    });

    vapiInstance.on("call-end", () => {
      //   setConnecting(false);
      setConnected(false);
    });

    vapiInstance.on("message", (message) => {
      console.log("Message received:");
      if (message.type === "transcript" && message.transcriptType === "final") {
        const chatMessage = {
          isFromUser: message.role === "user",
          textMessage: message.transcript,
          isImage: false,
          imageSrc: null,
        };
        setChatHistory((prev) => [...prev, chatMessage]);
      }
    });

    // vapiInstance.on("message", async (message) => {
    //   console.log("Message received:");
    //   if (message.type === "transcript" && message.transcriptType === "final") {
    //     const chatMessage = {
    //       isFromUser: message.role === "user",
    //       textMessage: message.transcript,
    //       isImage: false,
    //       imageSrc: null,
    //     };
    //     if (
    //       chatMessage.isFromUser &&
    //       chatMessage.textMessage.toLowerCase().includes("help")
    //     ) {
    //       const userPrompt = chatMessage.textMessage;
    //       console.log(userPrompt);
    //       try {
    //         await fetch("http://127.0.0.1:8000/help", {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({ text: userPrompt }),
    //         });
    //       } catch (error) {
    //         console.error("Error:", error);
    //       }
    //     }
    //     setChatHistory((prev) => [...prev, chatMessage]);
    //   }
    // });

    // TODO

    vapiInstance.on("error", (error) => {
      console.error(error);

      setConnecting(false);
    });
    return () => {
      console.log("cleanup");
      vapiInstance.stop();
    };
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(quoteInterval); // Clear interval on component unmount
  }, []);

  return (
    <div className={styles.page_container}>
      <div
        className={`${isChatVisible ? "w-2/3" : "w-full"} ${
          styles.interactable_container
        }`}
      >
        <div className="container fade-in fade-in-delay-1">
          <div
            className={`${
              init ? "voice_mode_container" : "non_voice_mode_container"
            } main_section_container fade-in fade-in-delay-2`}
          >
            <div className={styles.main_content_wrapper}>
              {isVoiceMode ? (
                <>
                  <div
                    className={`${styles.image_container} fade-in fade-in-delay-3`}
                  >
                    <img
                      src={dataMock[currentImageIndex].image}
                      alt="AI Assistant Avatar"
                      className="transition-transform h-full fade-in fade-in-delay-1"
                    />
                  </div>
                  <div className={styles.generation_text}>
                    {isHelpQuestion && (
                      <div className={styles.navigationWrapper}>
                        {/* Back button with SVG */}
                        <button
                          onClick={handlePrevious}
                          className={`${styles.navButton} ${styles.backButton}`}
                        >
                          <img src={backIcon} alt="Back" />
                        </button>

                        <p>{dataMock[currentImageIndex].description}</p>

                        {/* Next button with SVG */}
                        <button
                          onClick={handleNext}
                          className={styles.navButton}
                        >
                          <img src={nextIcon} alt="Next" />
                        </button>
                      </div>
                    )}

                    {/* {dataMock[currentImageIndex].description} */}
                  </div>
                  {/* <div className={styles.navigationButtons}>
                    <button onClick={handlePrevious}>Back</button>
                    <button onClick={handleNext}>Next</button>
                  </div> */}
                </>
              ) : (
                <>
                  <div className="h-full flex items-center justify-center fade-in fade-in-delay-2">
                    <CircleButton
                      startCallInline={startCallInline}
                      connected={connected}
                      endCall={endCall}
                    />
                  </div>
                  <p className="text-blue-200 text-center mt-8 text-2xl opacity-75 fade-in-out-5s aura_effect">
                    {quotes[quoteIndex]}
                  </p>
                </>
              )}
            </div>
          </div>
          {isChatVisible && (
            <NavigationBar
              startCallInline={startCallInline}
              endCall={endCall}
              handleMuteToggle={handleMuteToggle}
              isMuted={isMuted}
              connected={connected}
              className="fade-in fade-in-delay-3"
            />
          )}
        </div>
      </div>

      {/* Right section: Placeholder for ChatBot (1/3 of the screen) */}
      <div
        className={`h-screen ${
          isChatVisible
            ? "w-1/3 chat-section-visible"
            : "w-0 chat-section-hidden"
        } chat-section bg-black flex items-center justify-center`}
      >
        {/* <p>ChatBot will be here</p> */}
        {/* <div>
            {chatHistory.length > 0
              ? chatHistory.map((entry, index) => (
                  <div key={index}>
                    <strong>{entry.timestamp}</strong> [{entry.role}]:{" "}
                    {entry.text}
                  </div>
                ))
              : "No transcript available"}
          </div> */}
        {isChatVisible && (
          <ChatBox
            messages={chatHistory}
            setMessages={setChatHistory}
            vapi={vapi}
            connected={connected}
          />
        )}
      </div>
    </div>
  );
};

export default Learn;
