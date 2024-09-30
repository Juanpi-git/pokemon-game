// CARD DE CADA POKEMON, JUGADOR O PC
function Card({ pokemon }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-between">
      <span className="text-white">{pokemon.isPlayer ? "Jugador" : "PC"}</span>
      <span className="text-4xl text-white font-extrabold">{pokemon.name}</span>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="size-3/5"
        style={{ filter: "drop-shadow(10px 10px 5px black)" }}
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
      <div className="w-full flex justify-around">
        <div className="w-full flex flex-col">
          <span className="text-xl text-white">
            <span className="font-bold">Type: </span> {pokemon.type}
          </span>
          <span className="text-xl text-white">
            <span className="font-bold">Level: </span> {pokemon.level}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
