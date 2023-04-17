import Image from 'next/image'

import { usePlayer } from '@/hooks/usePlayer';

export default function Player() {
    const {
        play,
        audioContainerRef,
        activeMusic,
        processArtistName,
        leftTime,
        handleAdjustVolume,
        volumeContainerRef,
        handleAdjustProgress,
        progressContainerRef,
        progressStyle,
        handleChangePlayMode,
        handlePrev,
        handleToggle,
        handleNext,
        formatSeconds,
        onPlayerUpdate,
        volumeProgressStyle
    } = usePlayer()

    return (
        <div className="playerContainer">
            <audio
                autoPlay={play}
                preload="auto"
                ref={audioContainerRef}
                src={activeMusic.url}
                onTimeUpdate={onPlayerUpdate}
            />
            <div className="albumContainer">
                <div className='albumCover'>
                    <Image
                        src={activeMusic.cover}
                        alt={activeMusic.title}
                        width={500}
                        height={500}
                    />
                </div>
                <div className='albumTitle'>
                    <h4>{activeMusic.title}</h4>
                    <label>{processArtistName(activeMusic.artist)}</label>
                </div>

            </div>
            <div className='audioContainer'>
                <div className='buttonsWrapper'>
                    <div className='actionButton' onClick={handlePrev}>
                        Prev
                    </div>

                    <div className='actionButton controlButton' onClick={handleToggle}>
                        {
                            play ? "Pause" : "Play"
                        }
                    </div>
                    <div className='actionButton' onClick={handleNext}>
                        Next
                    </div>
                </div>
                <div className='player-dragger'>
                    <p className="current-time timelapse" >{formatSeconds(leftTime)}</p>
                    <div
                        className="progress-container"
                        onClick={handleAdjustProgress}
                        ref={progressContainerRef}
                    >
                        <div className="progress" style={progressStyle} />
                    </div>

                    <div className='full-time timelapse'>{formatSeconds(audioContainerRef?.current?.duration)}</div>
                </div>
            </div>
            <div className='audioControl'>
                <div className="volume-container">
                    <div className="volume-icon">
                        <i className="icon fa fa-volume-up" />
                    </div>
                    <div className="volume-wrapper">
                        {/* <div
                            className="progress-container"
                            onClick={handleAdjustVolume}
                            ref={volumeContainerRef}
                        >
                            <div
                                className="progress"
                                style={volumeProgressStyle}
                            />
                        </div> */}
                    </div>
                </div>

            </div>
        </div>
    );
}
