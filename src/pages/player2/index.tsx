import Slider from "../../components/slider/Slider";
import ControlPanel from "../../components/controls/ControlPanel";
import { useRef, useState } from "react";
import { playlist } from '../player1/data'

export default function Player2() {
    const [percentage, setPercentage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);


    const audioRef = useRef<any>()

    const onChange = (e: any) => {
        const audio = audioRef.current
        audio.currentTime = (audio.duration / 100) * e.target.value
        setPercentage(e.target.value)
    }
    const play = () => {
        const audio = audioRef.current
        audio.volume = 0.1

        if (!isPlaying) {
            setIsPlaying(true)
            audio.play()
        }

        if (isPlaying) {
            setIsPlaying(false)
            audio.pause()
        }
    }
    const getCurrDuration = (e: any) => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
        const time = e.currentTarget.currentTime

        setPercentage(+percent)
        setCurrentTime(time.toFixed(2))
    }
    const activeMusic = playlist[0];

    return (
        <div className='app-container'>
            <h1>Audio Player</h1>
            <Slider percentage={percentage} onChange={onChange} />
            <audio
                ref={audioRef}
                onTimeUpdate={getCurrDuration}
                onLoadedData={(e: any) => {
                    setDuration(e.currentTarget.duration.toFixed(2))
                }}
                src={activeMusic?.url}
            ></audio>
            <ControlPanel
                play={play}
                isPlaying={isPlaying}
                duration={duration}
                currentTime={currentTime}
            />
        </div>
    )
}
