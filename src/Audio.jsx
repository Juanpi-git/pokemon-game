import React, { useState, useRef, useEffect } from "react";
import pokemonAudio from "./assets/Pokemon Red, Yellow, Blue Battle Music- Trainer.mp3";
import playIco from "./assets/play-button.png";
import stopIco from "./assets/stop.png";
import pauseIco from "./assets/pause.png";
import volumeIco from "./assets/medium-volume.png";

function AudioPlayer() {
  // REFERENCIA PARA ACCEDER AL ELEMENTO DE AUDIO
  const audioRef = useRef(null);
  // ESTADO PARA EL BOTÓN DE PLAY/PAUSA
  const [audioIsPlaying, setAudioIsPlaying] = useState(true);
  // ESTADO PARA EL CONTROL DEL VOLUMEN
  const [volume, setVolume] = useState(0.25);

  // FUNCIÓN PARA DARLE PLAY AL AUDIO Y PAUSARLO
  const playPauseAudio = () => {
    if (audioRef.current) {
      audioIsPlaying ? audioRef.current.pause() : audioRef.current.play();
      setAudioIsPlaying(!audioIsPlaying);
    }
  };

  // FUNCIÓN PARA SUBIR O BAJAR EL VOLUMEN
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current ? (audioRef.current.volume = newVolume) : false;
    setVolume(newVolume);
  };

  // FUNCIÓN PARA PAUSAR EL VOLUMEN Y VOLVERLO AL INICIO
  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setAudioIsPlaying(false);
  };

  // EL VOLUMEN ARRANCA EN UN 30%
  useEffect(() => {
    audioRef.current ? (audioRef.current.volume = volume) : false;
  }, []);

  return (
    <>
      <audio ref={audioRef} src={pokemonAudio} autoPlay />
      <ul
        tabIndex={0}
        className="z-[1] flex justify-around items-center p-2 shadow rounded-lg bg-black/35 w-full"
      >
        <li className="flex flex-row justify-center gap-2">
          {/* BOTÓN PARA DARLE PLAY/PAUSA AL AUDIO */}
          <button
            className="btn btn-outline w-16 m-1 bg-white/50 hover:bg-white"
            onClick={playPauseAudio}
          >
            {/* si el audio está en pausa muestra la imagen del triángulo para darle play 
                y sino muestra los dos palitos para ponerle pausa*/}
            {!audioIsPlaying ? (
              <img className="w-14" src={playIco} alt="" />
            ) : (
              <img className="w-14" src={pauseIco} alt="" />
            )}
          </button>
          {/* BOTÓN PARA DARLE PAUSAR Y VOLVER AL INICIO EL AUDIO */}
          <button
            className="btn btn-outline w-16 m-1 bg-white/50 hover:bg-white"
            onClick={stopAudio}
          >
            <img className="w-14" src={stopIco} alt="" />
          </button>
        </li>
        {/* CONTROLADOR DE VOLUMEN */}
        <li>
          <div className="flex flex-row justify-center items-center gap-1 bg-white/50 rounded-md p-1">
            <img src={volumeIco} className="w-10" alt="" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </li>
      </ul>
    </>
  );
}

export default AudioPlayer;
