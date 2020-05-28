import * as PIXI from "pixi.js";
import genBasic from "./basic";
import { ColorOverlayFilter } from "pixi-filters";
import createText from "./text";

export const createCrowed1 = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const base = genBasic(app, res["crowed_level1"].texture, "crowed_level1");
  base.sprite.filters = [
    new ColorOverlayFilter(0xcccccc),
    ...base.sprite.filters,
  ];
  return base;
};

export const createCrowed2 = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const base = genBasic(app, res["crowed_level2"].texture, "crowed_level2");
  base.sprite.filters = [
    new ColorOverlayFilter(0xcccccc),
    ...base.sprite.filters,
  ];
  return base;
};

export const createCrowedTrain = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const container = new PIXI.Container();
  const train = genBasic(app, res["train"].texture, "train");
  const txt = createText("満", 25, 0xff0000).sprite;
  txt.localTransform.translate(38, -5);
  [train.sprite, txt].forEach((_) => container.addChild(_));
  return {
    width: train.width,
    height: train.height,
    sprite: container,
  };
};
