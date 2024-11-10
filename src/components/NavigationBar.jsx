import React, { useState } from "react";
import CenterButton from "./CenterButton";
import Mute from "./Mute";
import NavItem from "./NavItem";

// eslint-disable-next-line react/prop-types
const NavigationBar = ({
  startCallInline,
  handleMuteToggle,
  isMuted,
  connected,
  endCall,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartCall = () => {
    setIsLoading(true);
    startCallInline();
  };

  // Once connected state updates to true, stop the loading indicator
  if (connected && isLoading) {
    setIsLoading(false);
  }

  return (
    <nav className="flex justify-center w-full">
      <div className="bg-gray-900 rounded-3xl py-4 px-3 flex justify-around items-center w-full">
        <NavItem icon="back" label="Back" />
        <Mute
          handleMuteToggle={handleMuteToggle}
          isMuted={isMuted}
        />
        <CenterButton
          startCallInline={startCallInline}
          endCall={endCall}
          label="Call Xplore"
          isMuted={isMuted}
          connected={connected}
        />        
        <NavItem icon="next" label="Next" />
      </div>
    </nav>
  );
};

export default NavigationBar;
