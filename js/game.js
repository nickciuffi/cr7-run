import { Player } from "./player.js";

export class Game {
  constructor() {
    this.player = new Player(50, 0, 18);
    this.gameLoop;
    this.isPaused = false;
  }
  start() {
    this.addListeners();
    this.gameLoop = setInterval(() => {
      console.log("Running!!!");
      if(this.isPaused) return
      this.proccess();
      this.render();
    }, 17);
  }
  stop() {
    this.showRestart();
    clearInterval(this.gameLoop);
  }
  proccess() {
    this.player.proccess();
  }
  render() {
    this.player.render();
  }
  addListeners() {
    document.addEventListener("keydown", (data) => {
      console.log(data.key);
      if (data.key === " ") {
        if(this.isPaused) {
            this.isPaused = false;
            this.hideRestart()
            return
        }
        this.player.startJump();
      }
      if (data.key === "Escape") {
        this.showRestart();
        this.isPaused = true;
      }
    });
  }
  showRestart(){
    document.getElementById("restart").style.display = "block";
  }
  hideRestart(){
    document.getElementById("restart").style.display = "none";
  }
}
