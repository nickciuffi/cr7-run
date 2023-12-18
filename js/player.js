export class Player {
  constructor(x, y, width, height, jumpForce) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ySpeed = 0;
    this.jumpForce = jumpForce;
    this.isJumping = false;
    this.canJump = true;
    this.element = document.getElementById("cr7");
    this.bgImgs = [
      "url(./styles/img/cr7-1.png)",
      " url(./styles/img/cr7-2.png)",
    ];
    this.bgImgNum = 0;
    this.animationCount = 0;
  }
  startJump() {
    if (!this.canJump) return;
    this.ySpeed = this.jumpForce;
    this.isJumping = true;
    this.canJump = false;
  }
  executeJump() {
    this.y = this.y + this.ySpeed;
    if (this.y > -5) {
      this.ySpeed -= 1;
    } else {
      this.ySpeed = 0;
      this.y = -5;
      this.isJumping = false;
      setTimeout(() => {
        this.canJump = true;
      }, 100);
    }
  }
  animate() {
    this.animationCount++;
    if (this.animationCount < 10) return;
    this.animationCount = 0;
    this.element.style.backgroundImage = `${this.bgImgs[this.bgImgNum]}`;
    if (this.bgImgNum >= 1) {
      this.bgImgNum = 0;
    } else {
      this.bgImgNum = 1;
    }
  }
  proccess() {
    if (this.isJumping) this.executeJump();
    this.animate();
  }
  render() {
    this.element.style.bottom = this.px(this.y);
    this.element.style.left = this.px(this.x);
  }
  px(num) {
    return `${num}px`;
  }
}
