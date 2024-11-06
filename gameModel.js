import Ball from "./ball.js";

class GameModel {
  constructor(l,d) {
    this.ball=l;
    this.board=d;
    this.lives=3;
    this.points=0;
  }
  addPoints()
  {
    this.points+=1;
  }
  ballMove(){
    this.ball.move();
  }
  ballBounceHorizontal() {
    this.ball.x *= -1;
    this.ball.speedChange();
}

ballBounceVertical() {
    this.ball.y *= -1;
    this.ball.speedChange();
}
ballFall() {
    this.lives -= 1;
    if (this.liveChangedEvent) this.liveChangedEvent(this.lives);
    if (this.lives <= 0) {
        this.endGame();
    } else {
        this.ball.resetPosition();
    }
}







}
export default GameModel;
