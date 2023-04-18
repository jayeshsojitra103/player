import { useEffect } from 'react';
import Image from 'next/image'
import { usePlayer } from '@/hooks/usePlayer';
import Slider from '@/components/slider/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';



const DynamicWaveSurferPlayer = dynamic(
    () => import('../../components/WaveSurferPlayer/WaveSurferPlayer'),
    { ssr: false }
);
export default function Player() {
    const {
        play,
        audioContainerRef,
        activeMusic,
        processArtistName,
        leftTime,
        audioPercentage,
        onWaveToggle,
        handlePrev,
        handleToggle,
        handleNext,
        formatSeconds,
        onPlayerUpdate,
        onSongSliderChange,
        onVolumeSliderChange,
        volumePercentage,
        onVolumeToggle,
        isWavePlay,
        waveSurferRef,
        handleSongLoading,
        isSongLoading
    } = usePlayer();


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
                {
                    <>
                        <div className='buttonsWrapper'>
                            <button className='actionButton' onClick={handlePrev} disabled={isSongLoading}>
                                Prev
                            </button>

                            <button className='actionButton controlButton' onClick={handleToggle} disabled={isSongLoading}>
                                {
                                    play ? "Pause" : "Play"
                                }
                            </button>

                            <button className='actionButton' onClick={handleNext} disabled={isSongLoading}>
                                Next
                            </button>
                        </div>
                        <div className='player-dragger'>
                            <p className="timelapse" >{formatSeconds(leftTime)}</p>
                            <Slider percentage={audioPercentage} onChange={onSongSliderChange} />
                            <div className='timelapse'>{formatSeconds(audioContainerRef?.current?.duration)}</div>
                        </div>

                        <DynamicWaveSurferPlayer
                            waveSurferRef={waveSurferRef}
                            play={play}
                            audioUrl={activeMusic.url}
                            volumePercentage={volumePercentage}
                            handleSongLoading={handleSongLoading}
                            isSongLoading={isSongLoading}
                        />
                    </>

                }



            </div>
            <div className='audioControl'>
                <div className="volume-container">
                    <div className="volume-icon" onClick={onWaveToggle}>
                        <FontAwesomeIcon icon={faWaveSquare} />
                    </div>
                    <div className="volume-icon" onClick={onVolumeToggle}>
                        <i className="fa fa-volume-up" />
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
