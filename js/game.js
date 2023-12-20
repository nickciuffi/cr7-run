import { Enemy } from "./enemy.js";
import { Floor } from "./floor.js";
import { Player } from "./player.js";

export class Game {
  constructor() {
    this.player = new Player(50, 100, 50, 80, 20);
    this.width = getComputedStyle(
      document.querySelector("#game-container")
    ).width;
    this.floors = [
      new Floor(0, 0, this.width.replace("px", ""), 100, 5, "floor1"),
      new Floor(
        this.width.replace("px", ""),
        0,
        this.width.replace("px", ""),
        100,
        5,
        "floor2"
      ),
    ];
    this.enemies = [];
    this.isFirstPlay = true;
    this.gameLoop;
    this.isPaused = true;
    this.isStoped = false;
    this.dificultyCounter = 0;
    this.enemyCounter = 0;
    this.gameSpeed = 5;
    this.nextEnemyTime = 140;
    this.minEnemyTime = 120;
    this.enemiesQtd = 0;
    this.timeCounter = 0;
    document.querySelector(".high-score").innerHTML =
      "HighScore: " + localStorage.getItem("time") || 0;
  }

  setHighScore(time) {
    const storedTime = localStorage.getItem("time");
    if (!storedTime || time > storedTime) {
      alert(" New Highscore!");
      localStorage.setItem("time", time);
      document.querySelector(".high-score").innerHTML =
        "HighScore: " + time || 0;
    }
  }

  start() {
    if (!this.isFirstPlay) return;

    this.isFirstPlay = false;
    this.isPaused = false;
    this.isStoped = false;
    this.addListeners();
    this.addIntervals();
    setInterval(() => {
      if (this.isPaused || this.isStoped) return;
      this.timeCounter++;
      this.changeTime(this.timeCounter);
    }, 1000);
    this.gameLoop = setInterval(() => {
      if (this.isPaused || this.isStoped) return;
      this.proccess();
      this.render();
    }, 17);
  }
  changeTime(time) {
    document.querySelector(".time-shower").innerHTML = time;
  }
  pause() {
    this.isPaused = true;
    this.showRestart();
  }
  stop() {
    this.setHighScore(this.timeCounter);
    this.isStoped = true;
    this.showRestart();
  }
  restart() {
    this.changeTime("0");
    this.player.y = 100;
    this.floors[0].x = 0;
    this.floors[1].x = 800;
    this.timeCounter = 0;
    this.enemies = [];
    this.gameSpeed = 5;
    this.minEnemyTime = 120;
    this.setSpeeds();
    this.isStoped = true;
    document.querySelectorAll(".enemy").forEach((en) => {
      document.querySelector("#game-container").removeChild(en);
    });
  }
  setSpeeds() {
    this.floors.forEach((floor) => {
      floor.speed = this.gameSpeed;
    });
    this.enemies.forEach((en) => {
      en.speed = this.gameSpeed;
    });
  }
  makeGameHarder() {
    if (this.gameSpeed >= 20 || this.isPaused || this.isStoped) return;
    this.dificultyCounter++;
    if (this.dificultyCounter >= 300) {
      this.dificultyCounter = 0;
      this.gameSpeed++;
      this.setSpeeds();
    }
  }
  generateRand(min, variation) {
    return Math.floor(min + Math.random() * variation);
  }
  createNewEnemy() {
    this.enemyCounter++;
    if (this.enemyCounter < this.nextEnemyTime) return;
    this.enemyCounter = 0;
    this.enemiesQtd++;
    //how fast will the enemies come
    this.minEnemyTime -= 2;
    this.nextEnemyTime = this.generateRand(this.minEnemyTime, 60);
    const enEl = document.createElement("div");
    enEl.id = `enemy-${this.enemiesQtd}`;
    enEl.className = "enemy";
    document.querySelector("#game-container").appendChild(enEl);
    const en = new Enemy(
      2000,
      100,
      60,
      60,
      this.gameSpeed,
      enEl.id,
      this.timeCounter > 30,
      this.generateRand(1100, 2000),
      this.generateRand(20, 10)
    );
    this.enemies.push(en);
  }
  controlFloor() {
    if (this.floors[0].x <= -1 * this.width.replace("px", "")) {
      this.floors[0].x = this.width.replace("px", "");
      this.floors[1].x = 0;
    }
    if (this.floors[1].x <= -1 * this.width.replace("px", "")) {
      this.floors[1].x = this.width.replace("px", "");
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
    document.addEventListener("click", () => {
      if (this.isPaused || this.isStoped) return;
      this.player.startJump();
    });
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
        if (this.isStoped) return;
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
