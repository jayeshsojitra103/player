
import { usePlayer } from '@/hooks/usePlayer'

export default function Player() {
    const {
        play,
        audioContainerRef,
        activeMusic,
        processArtistName,
        formatSeconds,
        leftTime,
        handleAdjustVolume,
        volumeContainerRef,
        handleAdjustProgress,
        progressContainerRef,
        progressStyle,
        playModeClass,
        btnStyle,
        handleChangePlayMode,
        handlePrev,
        handleToggle,
        handleNext
    } = usePlayer()
    return (
        <div className="player-container">
            <audio
                autoPlay={play}
                preload="auto"
                ref={audioContainerRef}
                src={activeMusic.url}
            />
            <div className="info-and-control">
                <div className="music-info">
                    <h2 className="title">{activeMusic.title}</h2>
                    <h3 className="artist">
                        {processArtistName(activeMusic.artist)}
                    </h3>
                </div>
                <div className="time-and-volume">
                    <div className="left-time">
                        -{formatSeconds(leftTime)}
                    </div>
                    <div className="volume-container">
                        <div className="volume-icon">
                            <i className="icon fa fa-volume-up" />
                        </div>
                        <div className="volume-wrapper">
                            <div
                                className="progress-container"
                                onClick={handleAdjustVolume}
                                ref={volumeContainerRef}
                            >
                                <div
                                    className="progress"
                                    style={{ width: `volume * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>


                </div>

                <div
                    className="progress-container"
                    onClick={handleAdjustProgress}
                    ref={progressContainerRef}
                >
                    <div className="progress" style={progressStyle} /></div>
                <div className="control-container">
                    <div className="mode-control">
                        <i
                            className={`icon fa fa-${playModeClass}`}
                            style={btnStyle}
                            onClick={handleChangePlayMode}
                        />
                    </div>
                    <div className="controls">
                        <i
                            className="icon fa fa-step-backward"
                            style={btnStyle}
                            onClick={handlePrev}
                        />
                        <i
                            className={`icon fa fa-${play ? "pause" : "play"}`}
                            style={btnStyle}
                            onClick={handleToggle}
                        />
                        <i
                            className="icon fa fa-step-forward"
                            style={btnStyle}
                            onClick={handleNext}
                        />
                    </div>
                </div>
            </div>

            <div className="cover-container">
                <div
                    className="cover"
                    style={{ backgroundImage: `url(${activeMusic.cover})` }}
                />
            </div>
        </div>
    )
}
