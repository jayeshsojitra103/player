
import { useEffect, useRef, useState } from "react";
import WaveSurfer from 'wavesurfer.js';

import { playlist } from '../utils/data';
interface WaveSurferPlayerProps {
    audioUrl: string;
    volumePercentage: number,
    play: boolean
}

export const usePlayer = () => {
    const audioContainerRef = useRef<any>(null);
    const waveSurferRef = useRef<WaveSurfer | null>(null);


    const [play, setPlay] = useState<boolean>(false);
    const [activeMusicIndex, setActiveMusicIndex] = useState<number>(0);
    const [playMode, setPlayMode] = useState<string>("loop");
    const [leftTime, setLeftTime] = useState<number>(0);
    const [audioPercentage, setAudioPercentage] = useState<number>(0);
    const [volumePercentage, setVolumePercentage] = useState<number>(30);
    const [isWavePlay, setISWavePlay] = useState<boolean>(false);
    const [isSongLoading, setIsSongLoading] = useState<boolean>(true)

    const btnColor = "#4a4a4a";
    const activeMusic = playlist[activeMusicIndex];
    const playModeClass =
        playMode === "loop"
            ? "refresh"
            : playMode === "random"
                ? "random"
                : "repeat";
    const btnStyle = { color: btnColor };



    const handleSongLoading = (loading: boolean) => {
        setIsSongLoading(loading)
    }

    const onVolumeToggle = () => {
        setVolumePercentage(volumePercentage === 0 ? 100 : 0);
        audioContainerRef.current.volume = volumePercentage === 0 ? 1 : 0
    }

    const onVolumeSliderChange = (e: any) => {
        audioContainerRef.current.volume = e.target.value / 100;
        setVolumePercentage(e.target.value)
    }

    const onSongSliderChange = (e: any) => {
        if (play) {
            const value = e?.target?.value;
            const audio = audioContainerRef?.current;
            const currentTime = audioContainerRef?.current?.currentTime;
            audio.currentTime = (audio?.duration / 100) * value;
            //Update audio player slider 
            setLeftTime(audio?.duration - currentTime);
            setAudioPercentage(value);

            //Update WaveSurfer
            const position = parseFloat(value) / 100;
            waveSurferRef.current?.seekTo(position);
        }
        else {
            waveSurferRef.current?.seekTo(0);
            setAudioPercentage(0);
            setLeftTime(0)

        }
    }

    const onPlayerUpdate = (e: any) => {
        const duration = audioContainerRef?.current?.duration;
        const currentTime = audioContainerRef?.current?.currentTime;
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
        setLeftTime(duration - currentTime);
        setAudioPercentage(+percent)
    }

    const end = () => {
        handleNext()
    }

    const handleNext = () => {

        if (playMode === "repeat") {
            playMusic(activeMusicIndex);
        } else if (playMode === "loop") {
            const total = playlist.length;
            const index = activeMusicIndex < total - 1 ? activeMusicIndex + 1 : 0;
            playMusic(index);
        } else if (playMode === "random") {
            let randomIndex = Math.floor(Math.random() * playlist.length);
            while (randomIndex === activeMusicIndex) {
                randomIndex = Math.floor(Math.random() * playlist.length);
            }
            playMusic(randomIndex);
        } else {
            setPlay(false)
        }
    }

    const handlePrev = () => {
        if (playMode === "repeat") {
            playMusic(activeMusicIndex);
        } else if (playMode === "loop") {
            const total = playlist.length;
            const index = activeMusicIndex > 0 ? activeMusicIndex - 1 : total - 1;
            playMusic(index);
        } else if (playMode === "random") {
            let randomIndex = Math.floor(Math.random() * playlist.length);
            while (randomIndex === activeMusicIndex) {
                randomIndex = Math.floor(Math.random() * playlist.length);
            }
            playMusic(randomIndex);
        } else {
            setPlay(false)
        }
    }

    const playMusic = (index: number) => {
        setActiveMusicIndex(index);
        setLeftTime(0)
        setPlay(true);
        setAudioPercentage(0)
        audioContainerRef.current.currentTime = 0;
        audioContainerRef?.current?.play();
        waveSurferRef?.current?.play();
    }

    const handleToggle = () => {
        play ? audioContainerRef?.current?.pause() : audioContainerRef?.current?.play();
        play ? waveSurferRef?.current?.pause() : waveSurferRef?.current?.play();

        audioContainerRef.current.volume = 30 / 100;
        setVolumePercentage(30)

        waveSurferRef?.current?.setVolume(0)
        setPlay(!play)
    }

    const processArtistName = (artistList: Array<string>) => {
        return artistList.join(" / ");
    }

    const formatSeconds = (secs: number): string => {
        let hr = Math.floor(Number(secs) / 3600);
        let min = String(Math.floor((Number(secs) - (hr * 3600)) / 60));
        let sec = String(Math.floor(Number(secs) - (hr * 3600) - (Number(min) * 60)));

        if (Number(min) < 10) min = "0" + min;
        if (Number(sec) < 10) sec = "0" + sec;
        if (isNaN(secs)) return "- : -"

        return min + ':' + sec;
    }

    const onWaveToggle = () => {
        setISWavePlay(!isWavePlay)
    }

    //Wave logic
    const onWaveSeekChange = (value: number) => {
        if (play) {
            const audio = audioContainerRef?.current;
            const currentTime = audioContainerRef?.current?.currentTime;
            audio.currentTime = (audio?.duration / 100) * value;

            setLeftTime(audio?.duration - currentTime);
            setAudioPercentage(value)
        }
        else {
            setAudioPercentage(0);
            setLeftTime(0)
        }
    }
    return {
        play,
        audioContainerRef,
        activeMusic,
        processArtistName,
        leftTime,
        audioPercentage,
        playModeClass,
        btnStyle,
        handlePrev,
        handleToggle,
        handleNext,
        formatSeconds,
        onPlayerUpdate,
        onSongSliderChange,
        onVolumeSliderChange,
        volumePercentage,
        onVolumeToggle,
        onWaveToggle,
        isWavePlay,
        waveSurferRef,
        handleSongLoading,
        isSongLoading,
        onWaveSeekChange
    }
}