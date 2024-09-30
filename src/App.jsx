import Card from "./components/Card";
import { useEffect, useState } from "react";
import { calcDamage, endGame, randomize, startGame } from "./utils/functions";
import bgImg from "./assets/10_7_livecamera_6.jpg";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [pc, setPc] = useState(undefined);
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState("");
  const [attackLog, setAttackLog] = useState([]);

  // UNA VEZ QUE ARRANCA LA PÁGINA DONDE ESTÁ EL BOTÓN PARA ARRANCAR A JUGAR
  // SETEO EL ESTADO players CON LOS DOS POKS RANDOMS QUE DEVUELVE LA FUNCIÓN startGame
  useEffect(() => {
    setPlayers(startGame());
  }, []);

  // RECIÉN UNA VEZ QUE CAMBIA isPlaying (CARGA LA PÁGINA DEL JUEGO QUE CONTIENE LAS DOS CARDS DE POKS)
  // SETEO LOS ESTADOS player Y pc (QUE SE REFIEREN A LOS DOS POKS QUE JUEGAN) CON LOS DATOS
  // QUE TENGO EN PLAYERS, QUE LOS OBTUVE DEL useEffect ANTERIOR
  useEffect(() => {
    if (isPlaying) {
      setPlayer(players[0]);
      setPc(players[1]);
    } else {
      endGame();
    }
  }, [isPlaying]);

  // FUNCIÓN QUE SE EJECUTA AL HACER CLICK EN EL BOTÓN DE ATAQUE Y CALCULA EL DAÑO QUE LE HACE EL JUGADOR A LA MÁQUINA
  function playerAttack() {
    let playerDamage = calcDamage(player, pc);
    setPc({
      ...pc,
      life: pc.life - playerDamage,
    });
    // lleno el array log con los ataques de player, que luego los muestro en el log de la pantalla
    let move = player.moves[randomize(0, player.moves.length - 1)];
    let name = player.name;
    let color = player.color;
    let log = { move, name, color };
    setAttackLog((attackLog) => [...attackLog, log]);
    // calculo de antemano si el ataque del player va a dejar la vida de la pc en cero
    // si va a ser cero, la pc no ataca más
    if (pc.life - playerDamage > 0) {
      setTimeout(() => {
        pcAttack();
      }, 500);
    }
  }

  // FUNCIÓN QUE SE EJECUTA SOLA DENTRO DE playerAttack
  // Y ES EL ATAQUE DE LA MÁQUINA HACIA EL JUGADOR
  function pcAttack() {
    let pcDamage = calcDamage(pc, player);
    setPlayer({
      ...player,
      life: player.life - pcDamage,
    });
    // lleno el array log con los ataques de pc
    // que luego los muestro en el log de la pantalla
    let move = pc.moves[randomize(0, pc.moves.length - 1)];
    let name = pc.name;
    let color = pc.color;
    let log = { move, name, color };
    setAttackLog((attackLog) => [...attackLog, log]);
  }

  // CADA VEZ QUE player O pc CAMBIAN (CADA VEZ QUE SON ATACADOS) SE EJECUTA LA FUNCIÓN win
  // PARA VER SI HAY ALGUN GANADOR
  useEffect(() => {
    win();
  }, [player, pc]);

  // FUNCIÓN QUE DECIDE EL GANADOR
  function win() {
    if (pc && pc.life <= 0) {
      setWinner(player);
    } else if (player && player.life <= 0) {
      setWinner(pc);
    }
  }

  return (
    <>
      {!isPlaying && !winner ? (
        /* SI isPlaying Y winner SON false (NO ESTOY JUGANDO Y NO HAY UN GANADOR)
          ME APARECE EL BOTÓN PARA EMPEZAR EL JUEGO */
        <div
          className="w-screen h-screen flex justify-center items-center"
          style={{
            background: `url(${bgImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <button
            onClick={() => setIsPlaying(true)}
            className="btn border-none text-black w-1/4 h-1/5 shadow-lg shadow-green-700 rounded-lg bg-green-400 text-3xl font-bold hover:text-white hover:bg-green-500"
          >
            Start Game!
          </button>
        </div>
      ) : isPlaying && !winner ? (
        /* SI isPlaying ES true Y winner ES false (ESTOY JUGANDO Y NO HAY UN GANADOR)
          ME APARECE LA PANTALLA CON LOS DOS POK Y PUEDO JUGAR */
        <div
          className="w-screen h-screen flex gap-2 p-5"
          style={{
            background: `url(${bgImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="w-2/5 p-3 rounded-lg bg-black/35">
            <Card
              // hago el ternario porque primero se ejecuta en el useEffect al cargar la pág del botón
              // y ahi player es false. Luego se ejecuta en el useEffect al cambiar isPlayer, y ahi es true
              pokemon={player ? player : false}
            />
            <button
              // winner arranca valiendo "" que es un falsy, osea que en un principio es false
              // cuando winner se hace true (cuando alguien gana) se desactiva el botón para atacar
              disabled={winner}
              onClick={() => playerAttack()}
              className="btn border-none shadow-lg bg-red-600 text-black w-20 font-semibold rounded-lg p-2 hover:bg-red-700 hover:text-white absolute left-1/3 bottom-9"
            >
              Attack!
            </button>
          </div>
          {/* recorro el array log que guarda cada ataque del player y pc y los muestro en la pantalla */}
          <ul className="w-1/5 p-2 pb-4 rounded-lg bg-black/35 flex flex-col items-start gap-2 overflow-y-scroll">
            {attackLog.map((log, index) => (
              <li key={index} className="w-full rounded-lg p-2 bg-black">
                <span className="text-xl" style={{ color: `${log.color}` }}>
                  {log.name}
                </span>{" "}
                <span className="text-xl text-white">used</span>{" "}
                <span className="text-xl text-white">{log.move}</span>
              </li>
            ))}
          </ul>

          <div className="w-2/5 p-3 rounded-lg bg-black/35">
            <Card
              // hago el ternario porque primero se ejecuta en el useEffect al cargar la pág del botón
              // y ahi pc es false. Luego se ejecuta en el useEffect al cambiar isPlayer, y ahi es true
              pokemon={pc ? pc : false}
            />
          </div>
        </div>
      ) : (
        /* SI isPlaying ES true Y winner ES true (ESTOY JUGANDO Y HAY UN GANADOR)
          ME APARECE LA PANTALLA CON EL NOMBRE DEL GANADOR */
        <div
          className="w-screen h-screen flex justify-center items-center"
          style={{
            background: `url(${bgImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <button className="border-none text-black w-1/4 h-1/5 shadow-lg shadow-green-700 rounded-lg bg-green-400 text-3xl font-bold">
            {`${winner.name} wins!`}
          </button>
        </div>
      )}
    </>
  );
}

export default App;
