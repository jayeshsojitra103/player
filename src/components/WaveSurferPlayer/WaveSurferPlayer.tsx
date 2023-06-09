import { useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveSurferPlayerProps {
    audioUrl: string;
    waveSurferRef: WaveSurfer | null | any;
    handleSongLoading: any,
    onWaveSeekChange: any
}

const WaveSurferPlayer: React.FC<WaveSurferPlayerProps> = (
    {
        audioUrl,
        waveSurferRef,
        handleSongLoading,
        onWaveSeekChange
    }) => {


    //Wave Surface
    useEffect(() => {
        waveSurferRef.current = WaveSurfer.create({
            container: "#waveform",
            waveColor: "#3b82f680",
            progressColor: "#fff",
            cursorColor: "#fff",
            barWidth: 3,
            barRadius: 3,
            responsive: true,
            autoCenter: false,
            height: 30,
            // If true, normalize by the maximum peak instead of 1.0.
            normalize: false,
            // Use the PeakCache to improve rendering speed of large waveforms.
            partialRender: true,
        });

        waveSurferRef?.current?.load(audioUrl);
        waveSurferRef?.current?.on("ready", function () {
            waveSurferRef?.current?.setVolume(0);
            handleSongLoading(false)
        });
        return () => {
            waveSurferRef?.current?.destroy()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioUrl]);


    waveSurferRef?.current?.on('seek', function (progress: number) {
        onWaveSeekChange(progress * 100)
    });

    useEffect
    return <div id="waveform" ref={waveSurferRef} ></div >
};

export default WaveSurferPlayer;
