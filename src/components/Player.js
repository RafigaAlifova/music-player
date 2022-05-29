import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faVolumeDown, faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";

function Player({currentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo, songs, setCurrentSong, setSongs, setVolume, activeVolume, setActiveVolume,}) {
    const activeLibraryHandler = (nexPrev) => {
        const newSongs = songs.map((song) => {
            if (song.id === nexPrev.id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
    };
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    };

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };
    const skipTrackHandler = async (direaction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direaction === "next") {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if (direaction === "prev") {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                if (isPlaying) await audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        if (isPlaying) await audioRef.current.play();
    };

    const ChangeVolume = (e) => {
        let value = e.target.value;
        audioRef.current.volume = value;
        setVolume(value );
    };

    return (
        <div className="player">
            <div className="header">
                <img
                    alt={currentSong.name}
                    src={currentSong.cover}
                    className={isPlaying ? "rotate" : null}
                />
                <h2>{currentSong.name}</h2>
                <h3>{currentSong.artist}</h3>
            </div>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div
                    style={{
                        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]} )`,
                    }}
                    className="track"
                >
                    <input
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        type="range"
                        onChange={dragHandler}
                    />

                    <div style={trackAnim} className="animate-track"></div>
                </div>

                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler("prev")}
                    icon={faStepBackward} //eslinde faAngleLeft
                    className="skip-prev"
                    size="2x"
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    icon={isPlaying ? faPause : faPlay}
                    className="play-pause"
                    size="2x"
                />
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler("next")}
                    icon={faStepForward}
                    className="skip-next"
                    size="2x"
                />
                <div className="volume-control">
                    <FontAwesomeIcon
                        onClick={() => setActiveVolume(!activeVolume)}
                        icon={faVolumeDown}
                    />
                    {activeVolume && (
                        <input
                            onChange={ChangeVolume}
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={songInfo.volume}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Player;
