import * as PIXI from "pixi.js";
import genBasic from "./basic";
import { TiltShiftFilter, CRTFilter } from "pixi-filters";
import createText from "./text";

const AIR_COLOR = 0x87ceeb;

const background = (app: PIXI.Application) => {
  const container = new PIXI.Container();
  const air = new PIXI.Graphics();
  air.beginFill(AIR_COLOR);
  air.drawRect(0, 0, 600, 250);
  air.endFill();

  const gr = new PIXI.Graphics();
  gr.beginFill(0x778899);
  gr.drawRect(0, 250, 600, 150);
  gr.endFill();

  [air, gr].forEach((_) => container.addChild(_));
  return container;
};

const mainPerson = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const container = new PIXI.Container();
  const human = genBasic(app, res["human"].texture, "human").sprite;
  human.localTransform.scale(8, 8).translate(-100, -50);
  const f1 = new TiltShiftFilter(
    150,
    1000,
    new PIXI.Point(0, 0),
    new PIXI.Point(1, 0)
  );
  const f2 = new PIXI.filters.AlphaFilter(0.6);
  human.filters.pop();
  human.filters.push(f2);
  human.filters.push(f1);
  const shadow = new PIXI.Graphics();
  shadow.beginFill(AIR_COLOR);
  shadow.drawRect(0, 150, 300, 300);
  shadow.endFill();
  shadow.filters = [new PIXI.filters.BlurFilter(75, 10)];

  container.addChild(human);
  container.addChild(shadow);

  const mask = new PIXI.Graphics();
  mask.beginFill(0x000000);
  mask.drawRect(0, 0, 400, 180);
  mask.endFill();
  container.mask = mask;
  return container;
};

const company = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const c = genBasic(app, res["company"].texture, "company").sprite;
  c.localTransform.scale(2, 2).translate(260, 115);
  c.filters.pop();
  c.filters.pop();
  return c;
};

const message = (app: PIXI.Application) => {
  const container = new PIXI.Container();
  const txt1 = createText("ありがとう…", 35).sprite;
  txt1.localTransform.translate(200, 20);
  const txt2 = createText("仕事、行ってくるぜ…", 35).sprite;
  txt2.localTransform.translate(225, 65);
  [txt1, txt2].forEach((_) => container.addChild(_));
  return container;
};

const avator = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const av = genBasic(app, res["human"].texture, "human").sprite;
  av.localTransform.scale(1, 1).translate(325, 255);
  av.filters.pop();
  return av;
};

const train = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const train = genBasic(app, res["train"].texture, "train").sprite;
  train.localTransform.scale(8, 8).translate(-200, 50);
  train.filters.pop();
  train.filters.pop();
  const f = new CRTFilter();
  train.filters.push(f);
  return train;
};

const createThanks = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const container = new PIXI.Container();
  const bg = background(app);
  const main = mainPerson(app);
  const msg = message(app);
  const c = company(app);
  const av = avator(app);
  const t = train(app);
  [bg, main, msg, c, av, t].forEach((_) => container.addChild(_));
  return {
    sprite: container,
    width: 600,
    height: 400,
  };
};

export default createThanks;
