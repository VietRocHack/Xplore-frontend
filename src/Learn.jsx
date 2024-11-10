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

import { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import Vapi from "@vapi-ai/web";
import { VAPI_KEY } from "./utils";
import ChatBox from "./components/ChatBox";
import CircleButton from "./components/CircleButton";
const quotes = [
  "Unlock the door to endless discovery.",
  "Every click is a step closer to wisdom.",
  "Tap into your potential and let curiosity lead.",
  "Your journey to knowledge begins here.",
  "Empower yourself with every question you ask.",
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
    <div className="bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen flex">
      <div
        className={`${
          isChatVisible ? "w-2/3" : "w-full"
        } flex items-center justify-center mt-8 mb-8 transition-all duration-500`}
      >
        <div className="flex flex-col items-center justify-center w-full h-full m-8 space-y-32 fade-in fade-in-delay-1">
          <div className="flex flex-col items-center justify-center w-full h-[500px] mt-8 space-y-32 relative fade-in fade-in-delay-2">
            <div className="flex flex-col items-center justify-center h-full w-full">
              {isVoiceMode ? (
                <div className="bg-purple-500 rounded-[15px] h-full flex items-center justify-center fade-in fade-in-delay-3">
                  <img
                    src={female2}
                    alt="AI Assistant Avatar"
                    className="transition-transform h-full fade-in fade-in-delay-1"
                  />
                </div>
              ) : (
                <>
                  <div className="h-full flex items-center justify-center fade-in fade-in-delay-2">
                    <CircleButton
                      startCallInline={startCallInline}
                      connected={connected}
                      endCall={endCall}
                    />
                  </div>
                  <p className="text-blue-200 text-center mt-8 text-2xl opacity-75 fade-in-out">
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
