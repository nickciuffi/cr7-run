import { Object } from "./object.js";

export class Enemy extends Object {
  constructor(
    x,
    y,
    width,
    height,
    speed,
    id,
    isAllowedToJump,
    jumpInterval,
    jumpForce
  ) {
    super(x, y, width, height, speed, id);
    this.ySpeed = 0;
    this.jumpForce = jumpForce;
    this.height = Math.round(height + 40 * ((-1 * jumpForce) / 10 + 3));
    this.isJumping = false;
    this.canJump = true;
    this.jumpInterval = jumpInterval;
    this.isAllowedToJump = isAllowedToJump;
    this.createIntervals();
    console.log("height: " + this.height);
    console.log("jump force: " + this.jumpForce);
  }

  createIntervals() {
    setInterval(() => {
      this.startJump();
    }, this.jumpInterval);
  }

  startJump() {
    if (!this.canJump || !this.isAllowedToJump) return;
    this.ySpeed = this.jumpForce;
    this.isJumping = true;
    this.canJump = false;
  }
  executeJump() {
    this.y = this.y + this.ySpeed;
    if (this.y > 0) {
      this.ySpeed -= 1;
    } else {
      this.ySpeed = 0;
      this.y = 0;
      this.isJumping = false;
      setTimeout(() => {
        this.canJump = true;
      }, 100);
    }
  }
  proccess() {
    this.x = this.x - this.speed;
    if (this.isJumping) this.executeJump();
  }
}
