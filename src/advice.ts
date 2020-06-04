import * as PIXI from "pixi.js"
import genBasic from "./basic";
import createText from "./text";

export const createAdviceOn = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const container = new PIXI.Container();
  const bar = genBasic(app, res["advice_on"].texture, "advice_on");
  const txt = createText("あり", 20).sprite;
  txt.localTransform.translate(7, 28);
  [bar.sprite, txt].forEach((_) => container.addChild(_));
  return {
    width: bar.width,
    height: bar.height,
    sprite: container,
  };
};

export const createAdviceOff = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const container = new PIXI.Container();
  const bar = genBasic(app, res["advice_off"].texture, "advice_off");
  const txt = createText("なし", 18).sprite;
  txt.localTransform.translate(37, 28);
  [bar.sprite, txt].forEach((_) => container.addChild(_));
  return {
    width: bar.width,
    height: bar.height,
    sprite: container,
  };
};
