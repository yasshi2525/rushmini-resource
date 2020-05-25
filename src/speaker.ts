import * as PIXI from "pixi.js";
import genBasic from "./basic";
import { ColorOverlayFilter, OutlineFilter } from "pixi-filters";

const createIcon = (app: PIXI.Application, key: string) => {
  const res = app.loader.resources;
  const container = new PIXI.Container();
  const bg = genBasic(app, res["help"].texture, "help").sprite;
  bg.filters = [new ColorOverlayFilter(0xffffff), ...bg.filters];
  const icon = genBasic(app, res[key].texture, key).sprite;
  icon.localTransform.translate(20, 20);
  [bg, icon].forEach((_) => container.addChild(_));
  return {
    sprite: container,
    width: container.width + 28,
    height: container.height + 28,
  };
};

export const createSpeakerOn = (app: PIXI.Application) =>
  createIcon(app, "speaker_on");

export const createSpeakerOff = (app: PIXI.Application) =>
  createIcon(app, "speaker_off");
