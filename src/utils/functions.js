import { pokemons } from "./data";

// FUNCIÓN QUE RETORNA UN NÚM RANDOM ENTRE min Y max
export function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// FUNCIÓN QUE GENERA UN POKEMON RANDOM
export function chooseRandomPokemon() {
  const randomNum = randomize(0, pokemons.length - 1);
  return pokemons[randomNum];
}

// FUNCIÓN QUE CALCULA EL NIVEL DEL POKEMON
export function calcLevel() {
  return randomize(1, 10);
}

// FUNCIÓN QUE CALCULA LA VIDA DEL POKEMON
export function calcLife(level) {
  return level * 1000;
}

// FUNCIÓN QUE CALCULA LA SUERTE EN UN ATAQUE
export function luck() {
  const randomNum = Math.random();
  if (randomNum <= 0.3) {
    return 3;
  } else if (randomNum <= 0.6) {
    return 1;
  } else {
    return 0.5;
  }
}

// FUNCIÓN QUE CALCULA LA EFECTIVIDAD DE LOS ATAQUES DE LOS POK
export function calcEffectiveness(attackerPok, defenderPok) {
  if (attackerPok.type == "Water" && defenderPok.type == "Fire") {
    return 3;
  } else if (attackerPok.type == "Fire" && defenderPok.type == "Earth") {
    return 3;
  } else if (attackerPok.type == "Earth" && defenderPok.type == "Electric") {
    return 3;
  } else if (attackerPok.type == "Electric" && defenderPok.type == "Water") {
    return 3;
  } else if (attackerPok.type == defenderPok.type) {
    return 1;
  } else {
    return 0.5;
  }
}

// FUNCIÓN QUE CALCULA EL DAÑO QUE HACEN LOS POK AL ATACAR
export function calcDamage(attackerPok, defenderPok) {
  let effectiveness = calcEffectiveness(attackerPok.type, defenderPok.type);
  let lucky = luck();
  let damage =
    ((550 * attackerPok.level) / defenderPok.level) * effectiveness * lucky;
  return damage;
}

// FUNCIÓN QUE INICIA EL JUEGO
export function startGame() {
  // elijo un pokemon random para el jugador, y le agrego vida y nivel
  let pokemonPlayer = chooseRandomPokemon();
  let playerLevel = calcLevel();
  let playerLife = calcLife(playerLevel);
  let player = {
    ...pokemonPlayer,
    level: playerLevel,
    life: playerLife,
    maxLife: playerLife,
    isPlayer: true,
  };
  // elijo un pokemon random para la pc, y le agrego vida y nivel
  let pokemonPc = chooseRandomPokemon();
  let pcLevel = calcLevel();
  let pcLife = calcLife(pcLevel);
  let pc = {
    ...pokemonPc,
    level: pcLevel,
    life: pcLife,
    maxLife: pcLife,
    isPlayer: false,
  };
  // retorno un array con los pokemones
  return [player, pc];
}

// FUNCIÓN QUE TERMINA EL JUEGO
export function endGame() {
  // retorno un array vacío
  return [];
}
