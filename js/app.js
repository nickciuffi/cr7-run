import { Game } from "./game.js";

let game = new Game();
const btnStart = document.querySelector("#start");
const btnRestart = document.querySelector("#restart");
btnStart.addEventListener("click", () => {
  btnStart.style.display = "none";
  if (game.isFirstPlay) return game.start();
  game.isStoped = false;
  game.isPaused = false;
});
btnRestart.addEventListener("click", () => {
  game.restart();
  game.hideRestart()
});
