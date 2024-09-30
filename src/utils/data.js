import pikachuImg from "../assets/pikachu.png";
import onixImg from "../assets/onix.png";
import charmanderImg from "../assets/charmander.png";
import squirtleImg from "../assets/squirtle.png";
/* import bulbasaurImg from "../assets/bulbasaur.png";
import snorlaxImg from "../assets/snorlax.png";
import umbreonImg from "../assets/umbreon.png"; */

export const pokemons = [
  {
    name: "Pikachu",
    type: "Electric",
    image: pikachuImg,
    moves: ["Thunderbolt", "Light Screen", "Thunder Wave"],
    color: "#F7D346",
  },
  {
    name: "Onix",
    type: "Earth",
    image: onixImg,
    moves: ["Rock Slide", "Sandstorm", "Iron Tail"],
    color: "#464544",
  },
  {
    name: "Charmander",
    type: "Fire",
    image: charmanderImg,
    moves: ["Fire Spin", "Inferno", "Dragon Pulse"],
    color: "#F15F3E",
  },
  {
    name: "Squirtle",
    type: "Water",
    image: squirtleImg,
    moves: ["Rain Dance", "Hydro Pump", "Liquidation"],
    color: "#A1D9EF",
  },
  /* {
    name: "Bulbasaur",
    type: "Grass",
    image: bulbasaurImg,
    moves: ["Growth", "Venoshock", "Poison Powder"],
  },
  {
    name: "Snorlax",
    type: "Normal",
    image: snorlaxImg,
    moves: ["Tackle", "Amnesia", "Mud Slap"],
  },
  {
    name: "Umbreon",
    type: "Dark",
    image: umbreonImg,
    moves: ["Confuse Ray", "Quick Attack", "Dark Pulse"],
  }, */
];
