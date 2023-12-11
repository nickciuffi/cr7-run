export class Player {
  constructor(x, y, jumpForce) {
    this.x = x;
    this.y = y;
    this.ySpeed = 0;
    this.jumpForce = jumpForce;
    this.isJumping = false;
    this.canJump = true;
    this.element = document.getElementById("cr7");
  }
  startJump() {
    if(!this.canJump) return
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
      this.isJumping = false
      setTimeout(() => {
        this.canJump = true;
      }, 100)
    }
  }
  proccess() {
    if (this.isJumping) this.executeJump();
  }
  render() {
    this.element.style.bottom = this.px(this.y);
    this.element.style.left = this.px(this.x);
  }
  px(num){
    return `${num}px`
  }
}
