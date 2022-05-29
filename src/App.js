import React, { useState, useRef } from "react";
import Player from "./components/Player";
import "./App.css";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";
function App() {
  const [volume, setVolume] = useState(0.5);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVolume, setActiveVolume] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,

  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };







  const audioRef = useRef(null);
  
  const songEndHandler = async () => {
    // audioRef.current.pause();
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying)  audioRef.current.play();
  };








  return (
    <div
      className={`App ${libraryStatus ? "library-active" : ""} `}
    >
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
         />

      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
        activeVolume={activeVolume}
        setActiveVolume={setActiveVolume}
        volume={volume}
        setVolume={setVolume}
      />
      {/* <Time timeStatus={timeStatus} /> */}
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
