import { Enemy } from "./enemy.js";
import { Floor } from "./floor.js";
import { Player } from "./player.js";

export class Game {
  constructor() {
    this.player = new Player(50, 0, 50, 80, 18);
    this.floors = [
      new Floor(0, 0, 2000, 100, 5, "floor1"),
      new Floor(2000, 0, 2000, 100, 5, "floor2"),
    ];
    this.enemies = [];
    this.gameLoop;
    this.isPaused = false;
    this.dificultyCounter = 0;
    this.enemyCounter = 0;
    this.gameSpeed = 5;
    this.nextEnemyTime = 140;
    this.minEnemyTime = 120;
    this.enemiesQtd = 0;
    this.timeCounter = 0;
  }

  start() {
    this.addListeners();
    this.addIntervals();
    setInterval(() => {
      this.timeCounter++;
      console.log("Tempo:", this.timeCounter);
    }, 1000);
    this.gameLoop = setInterval(() => {
      if (this.isPaused) return;
      this.proccess();
      this.render();
    }, 17);
  }
  stop() {
    this.showRestart();
    clearInterval(this.gameLoop);
  }
  makeGameHarder() {
    if (this.gameSpeed >= 15) return;
    this.dificultyCounter++;
    if (this.dificultyCounter >= 300) {
      this.dificultyCounter = 0;
      this.gameSpeed++;
      this.floors.forEach((floor) => {
        floor.speed = this.gameSpeed;
      });
      this.enemies.forEach((en) => {
        en.speed = this.gameSpeed;
      });
    }
  }
  createNewEnemy() {
    this.enemyCounter++;
    if (this.enemyCounter < this.nextEnemyTime) return;
    this.enemyCounter = 0;
    this.enemiesQtd++;
    //how fast will the enemies come
    this.minEnemyTime -= 2;
    this.nextEnemyTime = Math.floor(this.minEnemyTime + Math.random() * 40);
    const enEl = document.createElement("div");
    enEl.id = `enemy-${this.enemiesQtd}`;
    enEl.className = "enemy";
    document.querySelector("#game-container").appendChild(enEl);
    const en = new Enemy(2000, 0, 50, 80, this.gameSpeed, enEl.id);
    this.enemies.push(en);
  }
  controlFloor() {
    if (this.floors[0].x <= this.floors[0].width * -1) {
      this.floors[0].x = this.floors[0].width;
      this.floors[1].x = 0;
    }
    if (this.floors[1].x <= this.floors[1].width * -1) {
      this.floors[1].x = this.floors[1].width;
      this.floors[0].x = 0;
    }
  }
  detectCollision() {
    this.enemies.forEach((en) => {
      if (
        this.player.x + this.player.width >= en.x &&
        this.player.x < en.x + en.width &&
        this.player.y + this.player.height >= en.y &&
        this.player.y < en.y + en.height
      ) {
        this.stop();
      }
    });
  }
  proccess() {
    this.controlFloor();
    this.makeGameHarder();
    this.createNewEnemy();
    this.detectCollision();
    this.floors.forEach((floor) => {
      floor.proccess();
    });
    this.enemies.forEach((en) => {
      if (en.x <= -100) {
        this.enemies = this.enemies.filter((enemy) => enemy != en);
        document.querySelector("#game-container").removeChild(en.element);
      }

      en.proccess();
    });
    this.player.proccess();
  }
  render() {
    this.floors.forEach((floor) => {
      floor.render();
    });
    this.enemies.forEach((en) => {
      en.render();
    });
    this.player.render();
  }
  addIntervals() {
    setInterval(this.makeGameHarder, 200);
  }
  addListeners() {
    document.addEventListener("keydown", (data) => {
      if (data.key === " ") {
        if (this.isPaused) {
          this.isPaused = false;
          this.hideRestart();
          return;
        }
        this.player.startJump();
      }
      if (data.key === "Escape") {
        this.showRestart();
        this.isPaused = true;
      }
    });
  }
  showRestart() {
    document.getElementById("restart").style.display = "block";
  }
  hideRestart() {
    document.getElementById("restart").style.display = "none";
  }
}
