import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveSurferPlayerProps {
    audioUrl: string;
}

const WaveSurferPlayer: React.FC<WaveSurferPlayerProps> = ({ audioUrl }) => {
    const waveSurferRef = useRef<WaveSurfer | null>(null);

    useEffect(() => {
        waveSurferRef.current = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'violet',
            progressColor: 'purple',
            cursorColor: 'navy',
            backend: 'WebAudio',
            height: 120,
            barWidth: 2,
            barHeight: 1,
            barGap: 2,
            normalize: true,
        });

        waveSurferRef.current.load(audioUrl);
    }, [audioUrl]);

    return <div id="waveform" />;
};

export default WaveSurferPlayer;
