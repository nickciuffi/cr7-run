import { Game } from "./game.js";

const game = new Game();
const btnStart = document.querySelector("#start");
const btnRestart = document.querySelector('#restart');
btnStart.addEventListener("click", () => {
    btnStart.style.display = "none"
  game.start();
});
btnRestart.addEventListener('click', () => {
    btnRestart.style.display = "none"
    btnStart.style.display = "block"
    game.stop()
})

