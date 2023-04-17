import { playlist } from '../pages/player/data'
import { useEffect, useRef, useState } from "react";

export const usePlayer = () => {
    const audioContainerRef = useRef<any>(null);
    const volumeContainerRef = useRef<any>(null);
    const progressContainerRef = useRef<any>(null);

    const [play, setPlay] = useState<boolean>(false);
    const [activeMusicIndex, setActiveMusicIndex] = useState<number>(0);
    const [playMode, setPlayMode] = useState<string>("loop");
    const [leftTime, setLeftTime] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0)
    const [progress, setProgress] = useState<number>(0);


    const modeList = ["loop", "random", "repeat"];
    const btnColor = "#4a4a4a";
    const progressColor = "#fff";
    const activeMusic = playlist[activeMusicIndex];
    const playModeClass =
        playMode === "loop"
            ? "refresh"
            : playMode === "random"
                ? "random"
                : "repeat";
    const btnStyle = { color: btnColor };
    const progressStyle = {
        width: `${progress * 100}%`,
        backgroundColor: progressColor
    };
    const volumeProgressStyle: {
        width: string,
        backgroundColor: string
    } = {
        width: `${volume * 100}%`,
        backgroundColor: progressColor
    };


    const onPlayerUpdate = () => {
        const duration = audioContainerRef?.current?.duration;
        const currentTime = audioContainerRef?.current?.currentTime;
        setLeftTime(duration - currentTime);
    }


    const handleAdjustProgress = (e: { clientX: number; }) => {
        const progressContainer = progressContainerRef?.current;
        const progress =
            (e.clientX - progressContainer.getBoundingClientRect().left) /
            progressContainer.clientWidth;
        const currentTime = audioContainerRef?.current?.duration * progress;
        audioContainerRef.current.currentTime = currentTime;
        setPlay(true);
        setProgress(progress);
        audioContainerRef?.current?.play();
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


    const handleAdjustVolume = (e: { clientX: number; }) => {
        const volumeContainer = volumeContainerRef?.current;
        let volume =
            (e.clientX - volumeContainer.getBoundingClientRect().left) /
            volumeContainer.clientWidth;
        volume = volume < 0 ? 0 : volume;
        audioContainerRef.current.volume = volume;
        setVolume(volume);

        console.log("volume", volume)
    }

    const handleChangePlayMode = () => {
        let index = modeList.indexOf(playMode);
        index = (index + 1) % modeList.length;
        setPlayMode(modeList[index])
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
        setProgress(0);
        audioContainerRef.current.currentTime = 0;
        audioContainerRef?.current?.play();
    }
    const handleToggle = () => {
        play ? audioContainerRef?.current?.pause() : audioContainerRef?.current?.play();
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
    return {
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
        playModeClass,
        btnStyle,
        handleChangePlayMode,
        handlePrev,
        handleToggle,
        handleNext,
        formatSeconds,
        onPlayerUpdate,
        volumeProgressStyle
    }
}