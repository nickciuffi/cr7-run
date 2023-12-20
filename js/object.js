/* import { Floor } from "./floor.js"; */
import { Enemy } from "./enemy.js";

export class Object {
  constructor(x, y, width, height, speed, id) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.element = document.getElementById(id);
  }
  proccess() {
    this.x = this.x - this.speed;
  }
  render() {
    
    this.element.style.height = this.px(this.height);
    this.element.style.left = this.px(this.x);
    this.element.style.bottom = this.px(this.y);
  }
  porcent(num) {
    return `${num}%`;
  }
  px(num) {
    return `${num}px`;
  }
}
