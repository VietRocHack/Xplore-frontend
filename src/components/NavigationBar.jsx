import React, { useState } from "react";
import CenterButton from "./CenterButton";
import Mute from "./Mute";
import NavItem from "./NavItem";
import styles from "./page.module.css";

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

  if (connected && isLoading) {
    setIsLoading(false);
  }

  return (
    <div className={styles.navWrapper}>
      <div className={styles.navCue}></div> {/* Cue element */}
      <nav className={styles.nav_center}>
        <div className={styles.nav_container}>
          {/* <NavItem icon="back" label="Back" /> */}
          <Mute handleMuteToggle={handleMuteToggle} isMuted={isMuted} />
          <CenterButton
            startCallInline={startCallInline}
            endCall={endCall}
            label="Call Xplore"
            isMuted={isMuted}
            connected={connected}
          />
          {/* <NavItem icon="next" label="Next" /> */}
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
