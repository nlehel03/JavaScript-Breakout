class Ball {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.x = 3;
    this.y = 3;
    this.speedX = 3;
    this.speedY = 3;
    this.xAlap = 3;
    this.yAlap = 3;
    this.kezdoPozicio = this.getBoundingClientRect();
    this.xTouchCount = 1;
    this.yTouchCount = 1;
    this.updatePosition();
  }

  speedChange() {
    if (x >= 0) {
      xTouchCount += 1;
    } else if (x < 0) {
      xTouchCount -= 1;
    }

    if (y >= 0) {
      yTouchCount += 1;
    } else if (y < 0) {
      yTouchCount -= 1;
    }
    if (xTouchCount == 10) {
      x++;
      xTouchCount = 0;
      Debug.WriteLine("labda gorsul: " + x + ";" + y);
    }
    if (yTouchCount == 10) {
      y++;
      yTouchCount = 0;
    }
  }
  updatePosition() {
    this.element.style.position = "absolute";
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.updatePosition();
  }
  resetPosition(x, y) {
    this.x = this.kezdoPozicio.Left;
    this.y = this.kezdoPozicio.Top;
    this.updatePosition();
}
}
export default Ball;
