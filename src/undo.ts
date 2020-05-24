import * as PIXI from "pixi.js";
import genBasic from "./basic";
import { ColorOverlayFilter, OutlineFilter } from "pixi-filters";

const createUndoIcon = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const container = new PIXI.Container();
  const bg = genBasic(app, res["help"].texture, "help").sprite;
  bg.filters = [new ColorOverlayFilter(0xffffff), ...bg.filters];
  const icon = genBasic(app, res["undo"].texture, "undo").sprite;
  icon.localTransform.translate(26, 23);
  [bg, icon].forEach((_) => container.addChild(_));
  return {
    sprite: container,
    width: container.width + 28,
    height: container.height + 28,
  };
};

export default createUndoIcon;
