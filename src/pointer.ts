import * as PIXI from "pixi.js"

const createPointer = (app: PIXI.Application) => {
  const circle = new PIXI.Graphics();
  circle.beginFill(0xff7f50, 0.5);
  circle.drawCircle(0, 0, 50)
  circle.endFill();
  circle.localTransform.translate(50, 50)
  return {
    sprite: circle,
    width: 100,
    height: 100
  }
};

export default createPointer;