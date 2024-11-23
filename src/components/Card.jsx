import { useState } from "react";

// CARD DE CADA POKEMON, JUGADOR O PC
function Card({ pokemon, onClick, disabled }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-between">
      <span className="text-white text-2xl font-silkscreen font-bold">
        {pokemon.isPlayer ? "Player" : "Pc"}
      </span>
      <img src={pokemon.nameImg} alt={pokemon.name} className="h-1/4" />
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="h-1/2"
        style={{ filter: `drop-shadow(10px 10px 5px ${pokemon.color})` }}
      />
      {/* BARRA DE VIDA QUE DISMINUYE A MEDIDA QUE EL POK ES ATACADO */}
      <progress
        /* a medida que baja la barra de vida va cambiando de color */
        className={`progress ${
          pokemon.life <= pokemon.maxLife / 3
            ? "progress-error"
            : pokemon.life <= (2 * pokemon.maxLife) / 3
            ? "progress-warning"
            : "progress-success"
        } h-7`}
        value={pokemon.life}
        max={pokemon.maxLife}
      ></progress>
      <div className="w-full flex justify-around items-end">
        <div className="w-full flex flex-col gap-2">
          <span className="text-2xl text-white">
            <span className="font-bold">Type:</span> {pokemon.type}
          </span>
          <span className="text-2xl text-white">
            <span className="font-bold">Level:</span> {pokemon.level}
          </span>
        </div>
        <button
          // el botón solo se muestra en el pokemon del jugador, no en el de la pc
          className={`${
            pokemon.isPlayer
              ? "btn border-none shadow-lg bg-red-600 text-black w-20 font-semibold rounded-lg p-2 hover:bg-red-700 hover:text-white"
              : "hidden"
          }`}
          onClick={onClick}
          disabled={disabled}
        >
          Attack!
        </button>
      </div>
    </div>
  );
}

export default Card;
