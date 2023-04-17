import Image from 'next/image'

import { usePlayer } from '@/hooks/usePlayer';
import Slider from '@/components/slider/Slider';


export default function Player() {
    const {
        play,
        audioContainerRef,
        activeMusic,
        processArtistName,
        leftTime,
        audioPercentage,
        handleChangePlayMode,
        handlePrev,
        handleToggle,
        handleNext,
        formatSeconds,
        onPlayerUpdate,
        onSongSliderChange,
        onVolumeSliderChange,
        volumePercentage,
        onVolumeToggle
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
                    <Slider percentage={audioPercentage} onChange={onSongSliderChange} />
                    <div className='full-time timelapse'>{formatSeconds(audioContainerRef?.current?.duration)}</div>
                </div>
            </div>
            <div className='audioControl'>
                <div className="volume-container">
                    <div className="volume-icon" onClick={onVolumeToggle}>
                        <i className="icon fa fa-volume-up" />
                    </div>
                    <div className="volume-wrapper">
                        <Slider
                            percentage={volumePercentage}
                            onChange={onVolumeSliderChange}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}