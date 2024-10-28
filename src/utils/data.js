import pikachuImg from "../assets/pikachu.png";
import pikachuNameImg from "../assets/PikachuNameImg.png";
import pikachuWinsImg from "../assets/Pikachu-wins-24-10-2024.png";
import onixImg from "../assets/onix.png";
import onixNameImg from "../assets/OnixNameImg.png";
import onixWinsImg from "../assets/Onix-wins-24-10-2024.png";
import charmanderImg from "../assets/charmander.png";
import charmanderNameImg from "../assets/CharmanderNameImg.png";
import charmanderWinsImg from "../assets/Charmander-wins-24-10-2024.png";
import squirtleImg from "../assets/squirtle.png";
import squirtleNameImg from "../assets/SquirtleNameImg.png";
import squirtleWinsImg from "../assets/Squirtle-wins-24-10-2024.png";
// import bulbasaurImg from "../assets/bulbasaur.png";
// import snorlaxImg from "../assets/snorlax.png";
// import umbreonImg from "../assets/umbreon.png";

export const pokemons = [
  {
    name: "Pikachu",
    type: "Electric",
    image: pikachuImg,
    moves: ["Thunderbolt", "Light Screen", "Thunder Wave"],
    color: "#F7D346",
    nameImg: pikachuNameImg,
    winnerImg: pikachuWinsImg,
  },
  {
    name: "Onix",
    type: "Earth",
    image: onixImg,
    moves: ["Rock Slide", "Sandstorm", "Iron Tail"],
    color: "#464544",
    nameImg: onixNameImg,
    winnerImg: onixWinsImg,
  },
  {
    name: "Charmander",
    type: "Fire",
    image: charmanderImg,
    moves: ["Fire Spin", "Inferno", "Dragon Pulse"],
    color: "#F15F3E",
    nameImg: charmanderNameImg,
    winnerImg: charmanderWinsImg,
  },
  {
    name: "Squirtle",
    type: "Water",
    image: squirtleImg,
    moves: ["Rain Dance", "Hydro Pump", "Liquidation"],
    color: "#67E4F8",
    nameImg: squirtleNameImg,
    winnerImg: squirtleWinsImg,
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
