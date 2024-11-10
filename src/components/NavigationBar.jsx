import React, { useState } from "react";
import CenterButton from "./CenterButton";
import Mute from "./Mute";
import NavItem from "./NavItem";
import Play from "./Play";

// eslint-disable-next-line react/prop-types
const NavigationBar = ({
  startCallInline,
  handleMuteToggle,
  isMuted,
  connected,
  endCall,
}) => {
  return (
    <nav className="flex justify-center w-full">
      <div className="bg-gray-900 rounded-3xl py-4 px-3 flex justify-around items-center w-full">
        <NavItem icon="back" label="Back" />
        <Mute
          handleMuteToggle={handleMuteToggle}
          isMuted={isMuted}
        />
        {/* <CenterButton
          startCallInline={startCallInline}
          endCall={endCall}
          label="Call Xplore"
          isMuted={isMuted}
          connected={connected}
        /> */}
        
        {connected ? <NavItem icon="stop" label="Stop" onClick={endCall} /> : <NavItem icon="play" label="Play" onClick={startCallInline} />}
        <NavItem icon="next" label="Next" />
      </div>
    </nav>
  );
};

export default NavigationBar;
