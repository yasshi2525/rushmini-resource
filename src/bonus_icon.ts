import * as PIXI from "pixi.js";
import genBasic from "./basic";
import { ColorOverlayFilter, OutlineFilter } from "pixi-filters";

const createBonusIcon = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const container = new PIXI.Container();
  const bg = genBasic(app, res["help"].texture, "help").sprite;
  bg.filters = [new ColorOverlayFilter(0xffffff), ...bg.filters];
  const icon = genBasic(app, res["bonus"].texture, "bonus").sprite;
  icon.localTransform.translate(21, 25);
  const mark = new PIXI.Graphics();
  mark.beginFill(0xff0000);
  mark.drawCircle(65, 32, 6);
  mark.endFill();
  const f = new OutlineFilter(3, 0xffffff, 1.0);
  f.padding = 3;
  mark.filters = [f];
  [bg, icon, mark].forEach((_) => container.addChild(_));
  return {
    sprite: container,
    width: container.width + 28,
    height: container.height + 28,
  };
};

export default createBonusIcon;
