import * as PIXI from "pixi.js";
import genBasic from "./basic";
import { ColorOverlayFilter, OutlineFilter } from "pixi-filters";

const createMinimizeIcon = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const container = new PIXI.Container();
  const bg = genBasic(app, res["help"].texture, "help").sprite;
  bg.filters = [new ColorOverlayFilter(0xffffff), ...bg.filters];
  const bar = new PIXI.Graphics();
  bar.beginFill(0x444444);
  bar.drawRect(28, 52, 37, 10);
  bar.endFill();
  [bg, bar].forEach((_) => container.addChild(_));
  return {
    sprite: container,
    width: container.width + 28,
    height: container.height + 28,
  };
};

export default createMinimizeIcon;
