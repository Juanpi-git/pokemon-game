import Card from "./components/Card";
import { useEffect, useRef, useState } from "react";
import { calcDamage, endGame, randomize, startGame } from "./utils/functions";
import bgImg from "./assets/10_7_livecamera_6.jpg";
import AudioPlayer from "./Audio";
import punchSound from "./assets/Punch Sound Effect.mp3";
import winnerSound from "./assets/Efecto de sonido, bien, win, ganador, acierto.mp3";
import looserSound from "./assets/Sonido de perdedor  Efecto de sonido.mp3";

function App() {
  // CREO LOS ESTADOS QUE VOY A USAR
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [pc, setPc] = useState(undefined);
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState("");
  const [attackLog, setAttackLog] = useState([]);
  const [desktopWidth, setDesktopWidth] = useState(undefined);
  const [disabledButton, setDisabledButton] = useState(false);

  // INSTANCIO LA CLASE AUDIO Y LE PASO LOS AUDIOS DEL ATAQUE DE LOS POKEMONS, DEL GANADOR Y DEL PERDEDOR
  const hitSound = new Audio(punchSound);
  const winnerSoundRef = useRef(null);
  const looserSoundRef = useRef(null);

  // UNA VEZ QUE ARRANCA LA PÁGINA DONDE ESTÁ EL BOTÓN PARA ARRANCAR A JUGAR
  // SETEO EL ESTADO players CON LOS DOS POKS RANDOMS QUE DEVUELVE LA FUNCIÓN startGame
  useEffect(() => {
    setPlayers(startGame());
    window.addEventListener("resize", () => {
      setDesktopWidth(window.innerWidth);
    });
  }, []);

  // RECIÉN UNA VEZ QUE CAMBIA isPlaying (CARGA LA PÁGINA DEL JUEGO QUE CONTIENE LAS DOS CARDS DE POKS)
  // SETEO LOS ESTADOS player Y pc (QUE SE REFIEREN A LOS DOS POKS QUE JUEGAN) CON LOS DATOS
  // QUE TENGO EN PLAYERS, QUE LOS OBTUVE DEL useEffect ANTERIOR
  useEffect(() => {
    if (isPlaying) {
      setPlayer(players[0]);
      setPc(players[1]);
    } else {
      // cuando isPLaying se vuelve a hacer false seteo todo a 0 para jugar denuevo
      setPlayers(endGame());
      setPlayers(startGame());
      setPlayer(players[0]);
      setPc(players[1]);
      setWinner(false);
      setAttackLog([]);
    }
  }, [isPlaying]);

  // FUNCIÓN QUE SE EJECUTA AL HACER CLICK EN EL BOTÓN DE ATAQUE
  // Y CALCULA EL DAÑO QUE LE HACE EL JUGADOR A LA MÁQUINA
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
    let isPlayer = player.isPlayer;
    let log = { move, name, color, isPlayer };
    // ejecuto el parentesis para que me deje todo lo que habia en attackLog
    // y le agregue el nuevo log(ataque)
    setAttackLog((attackLog) => [...attackLog, log]);
    // cada vez que ataco se escucha
    hitSound.volume = 0.3;
    hitSound.play();
    // deshabilito el botón de ataque cada vez que ataca la pc
    setDisabledButton(true);
    // calculo de antemano si el ataque del player va a dejar la vida de la pc en cero
    // si va a ser cero, la pc no ataca más
    if (pc.life - playerDamage > 0) {
      setTimeout(() => {
        pcAttack();
        // habilito el botón de ataque cada vez que ataca la pc
        setDisabledButton(false);
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
    let isPlayer = pc.isPlayer;
    let log = { move, name, color, isPlayer };
    // ejecuto el parentesis para que me deje todo lo que habia en attackLog
    // y le agregue el nuevo log(ataque)
    setAttackLog((attackLog) => [...attackLog, log]);
    // cada vez que la pc ataca se escucha
    hitSound.volume = 0.3;
    hitSound.play();
  }

  // CADA VEZ QUE player O pc CAMBIAN (ES DECIR, CADA VEZ QUE SON ATACADOS)
  // SE EJECUTA LA FUNCIÓN win PARA VER SI HAY ALGÚN GANADOR
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

  // ESTE useEffect SE EJECUTA CUADNO TOCO EL BOTÓN PARA SEGUIR JUGANDO,
  // YA QUE ESTOY SETEANDO winner A false (CAMBIA EL ESTADO DE WINNER)
  // SIN QUE CAMBIE isPlaying
  useEffect(() => {
    setPlayers(endGame());
    setPlayers(startGame());
    setPlayer(players[0]);
    setPc(players[1]);
    setAttackLog([]);
    setDisabledButton(false);
    // EL VOLUMEN ARRANCA EN UN 30%
    winnerSoundRef.current ? (winnerSoundRef.current.volume = 0.2) : false;
    looserSoundRef.current ? (looserSoundRef.current.volume = 0.2) : false;
  }, [winner]);

  return (
    <>
      {desktopWidth < 1024 ? (
        <div
          className="w-screen h-screen flex justify-center items-center"
          style={{
            background: `url(${bgImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <span className="font-silkscreen text-3xl text-white text-center font-bold">
            The game is not available for screen width's smaller than 1024px
          </span>
        </div>
      ) : !isPlaying && !winner ? (
        /* si isPlaying y winner son false (no estoy jugando y no hay un ganador)
          me aparece el botón para empezar el juego */
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
            className="btn border-none text-black w-1/4 h-1/5 shadow-lg shadow-green-700 rounded-lg bg-green-400 text-3xl font-silkscreen font-bold hover:text-white hover:bg-green-500 animate-bounce"
          >
            Start Game!
          </button>
        </div>
      ) : isPlaying && !winner ? (
        /* si isPlaying es true y winner es false (estoy jugando y no hay un ganador)
          me aparece la pantalla con los dos pokemons y puedo jugar */
        <div
          className="w-screen h-screen flex gap-2 p-8"
          style={{
            background: `url(${bgImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {/* POKEMON DEL JUGADOR */}
          <div className="w-2/5 p-3 rounded-lg bg-black/35">
            <Card
              // hago el ternario porque primero se ejecuta en el useEffect al cargar la pág del botón
              // y ahi player es false. Luego se ejecuta en el useEffect al cambiar isPlayer, y ahi es true
              pokemon={player ? player : false}
              onClick={() => playerAttack()}
              disabled={disabledButton}
            />
          </div>
          {/* LOG CENTRAL DE ATAQUES */}
          {/* recorro el array log que guarda cada ataque del player y pc y los muestro en la pantalla */}
          <div className="flex flex-col h-full w-1/5 items-center gap-2">
            <ul
              tabIndex={0}
              className="h-full w-full p-2 pb-4 rounded-lg bg-black/55 flex flex-col gap-2 overflow-y-scroll"
            >
              {attackLog.map((log, index) => (
                <li
                  key={index}
                  className={`w-3/4 rounded-lg p-2 text-xl ${
                    log.isPlayer == true
                      ? "self-start text-left"
                      : "self-end text-right"
                  }`}
                >
                  <span
                    className="font-semibold"
                    style={{ color: `${log.color}` }}
                  >
                    {log.name.toUpperCase()}
                  </span>{" "}
                  <span className="text-white">used</span>{" "}
                  <span className="text-white">{log.move}</span>
                </li>
              ))}
            </ul>
            {/* REPRODUCTOR DE AUDIO QUE APARECE ARRIBA A LA IZQUIERDA EN LA PANTALLA */}
            <AudioPlayer />
          </div>
          {/* POKEMON DE LA PC */}
          <div className="w-2/5 p-3 rounded-lg bg-black/35">
            <Card
              // hago el ternario porque primero se ejecuta en el useEffect al cargar la pág del botón
              // y ahi pc es false. Luego se ejecuta en el useEffect al cambiar isPlayer, y ahi es true
              pokemon={pc ? pc : false}
            />
          </div>
        </div>
      ) : (
        /* si isPlaying y winner son true (estoy jugando y hay un ganador)
        me aparece la pantalla con el nombre del ganador */
        <div
          className="w-screen h-screen flex flex-col"
          style={{
            background: `url(${bgImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {/* PANTALLA DEL GANADOR */}
          <div className="h-3/4 w-full flex flex-col justify-end items-center">
            {winner.isPlayer ? (
              <audio ref={winnerSoundRef} src={winnerSound} autoPlay />
            ) : (
              <audio ref={looserSoundRef} src={looserSound} autoPlay />
            )}
            <div className="flex flex-col justify-end items-center">
              <span className="text-white text-2xl font-silkscreen">
                {winner.isPlayer ? "Player" : "Pc"}
              </span>
              <img
                src={winner.winnerImg}
                alt={`${winner.name} wins`}
                className="h-3/4"
              />
            </div>
            <img
              src={winner.image}
              alt={winner.name}
              style={{ filter: `drop-shadow(10px 10px 5px ${winner.color})` }}
              className="h-1/2"
            />
          </div>
          <div className="h-1/4 w-full flex justify-end items-end p-10 gap-5">
            <button
              // vuelvo a jugar
              onClick={() => setWinner(false)}
              className="btn border-none shadow-lg bg-blue-600 text-black text-lg font-semibold rounded-lg p-2 hover:bg-blue-700 hover:text-white"
            >
              Keep Playing
            </button>
            <button
              // vuelvo al inicio
              onClick={() => setIsPlaying(false)}
              className="btn border-none shadow-lg bg-red-600 text-black text-lg font-semibold rounded-lg p-2 hover:bg-red-700 hover:text-white"
            >
              End Game
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
