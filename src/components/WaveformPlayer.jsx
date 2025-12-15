import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import PropTypes from 'prop-types';

/**
 * Componente de reproductor de audio con forma de onda usando WaveSurfer.js
 * @param {string} audioUrl - URL del archivo de audio
 * @param {string} waveColor - Color de la forma de onda (default: '#00bcd4')
 * @param {string} progressColor - Color del progreso (default: '#0097a7')
 * @param {number} height - Altura del contenedor (default: 80)
 */
export default function WaveformPlayer({ 
  audioUrl, 
  waveColor = '#00bcd4', 
  progressColor = '#0097a7',
  height = 80 
}) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  useEffect(() => {
    if (!audioUrl || !waveformRef.current) return;

    // Crear instancia de WaveSurfer
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: waveColor,
      progressColor: progressColor,
      cursorColor: '#ffffff',
      barWidth: 2,
      barRadius: 3,
      cursorWidth: 1,
      height: height,
      barGap: 2,
      responsive: true,
      normalize: true,
    });

    // Cargar audio
    wavesurferRef.current.load(audioUrl);

    // Event listeners
    wavesurferRef.current.on('ready', () => {
      setIsLoading(false);
      const dur = wavesurferRef.current.getDuration();
      setDuration(formatTime(dur));
    });

    wavesurferRef.current.on('audioprocess', () => {
      const time = wavesurferRef.current.getCurrentTime();
      setCurrentTime(formatTime(time));
    });

    wavesurferRef.current.on('play', () => {
      setIsPlaying(true);
    });

    wavesurferRef.current.on('pause', () => {
      setIsPlaying(false);
    });

    wavesurferRef.current.on('finish', () => {
      setIsPlaying(false);
    });

    wavesurferRef.current.on('error', (error) => {
      console.error('WaveSurfer error:', error);
      setIsLoading(false);
    });

    // Cleanup
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audioUrl, waveColor, progressColor, height]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  const handleStop = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.stop();
      setCurrentTime('0:00');
    }
  };

  return (
    <div className="waveform-player">
      <div className="waveform-container" ref={waveformRef} style={{ marginBottom: '10px' }}>
        {isLoading && (
          <div className="text-center py-3">
            <i className="fa fa-spinner fa-spin"></i> Cargando audio...
          </div>
        )}
      </div>
      
      <div className="waveform-controls d-flex align-items-center justify-content-between">
        <div className="controls-buttons">
          <button 
            className="btn btn-sm btn-primary me-2" 
            onClick={handlePlayPause}
            disabled={isLoading}
            title={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            <i className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>
          <button 
            className="btn btn-sm btn-secondary" 
            onClick={handleStop}
            disabled={isLoading}
            title="Detener"
          >
            <i className="fa fa-stop"></i>
          </button>
        </div>
        
        <div className="controls-time">
          <span className="text-muted small">
            {currentTime} / {duration}
          </span>
        </div>
      </div>

      <style>{`
        .waveform-player {
          width: 100%;
          padding: 10px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
        }
        
        .waveform-container {
          cursor: pointer;
        }
        
        .waveform-controls button {
          min-width: 40px;
        }
        
        .controls-time {
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}

WaveformPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  waveColor: PropTypes.string,
  progressColor: PropTypes.string,
  height: PropTypes.number
};
