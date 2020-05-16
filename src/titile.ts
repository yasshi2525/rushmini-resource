import * as PIXI from "pixi.js";
import genBasic from "./basic";
import { OutlineFilter } from "pixi-filters";
import createText from "./text";

const createTitle = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const container = new PIXI.Container();

  const r = genBasic(app, res["residence"].texture, "residence").sprite;
  r.localTransform.translate(20, 75);

  const h1 = genBasic(app, res["human"].texture, "human").sprite;
  h1.localTransform.translate(115, 100);

  const bg = new PIXI.Graphics();
  bg.alpha = 0.5;
  bg.beginFill(0xf0e68c);
  bg.drawCircle(0, 0, 150);
  bg.endFill();
  bg.localTransform.scale(1, 0.4).translate((816 * 0.8) / 2 - 10, 130);

  const st1 = genBasic(app, res["station"].texture, "station").sprite;
  st1.localTransform.translate(170, 85);
  st1.alpha = 0.75;

  const rCon = new PIXI.Container();
  for (let i = 0; i < 2; i++) {
    const rail = new PIXI.Sprite(res["rail"].texture);
    rail.localTransform
      .rotate(Math.PI / 2)
      .scale(0.125, 0.06)
      .translate(320 + i * 60, 130);
    rCon.addChild(rail);
  }
  rCon.alpha = 0.75;

  const st2 = genBasic(app, res["station"].texture, "station").sprite;
  st2.localTransform.translate(370, 85);
  st2.alpha = 0.75;

  const train = genBasic(app, res["train"].texture, "train").sprite;
  train.alpha = 0.75;
  train.localTransform.translate(280, 85);

  const f = new OutlineFilter(5, 0xffffff, 1);
  f.padding = 5;
  rCon.filters = [f];

  const txt1 = createText("線路を敷こう！", 45, 0x808000).sprite;
  txt1.localTransform.translate(100, 0);

  const finger = genBasic(app, res["finger"].texture, "finger").sprite;

  (finger.filters[finger.filters.length - 2] as OutlineFilter).color = 0x808000;
  (finger.filters[finger.filters.length - 1] as OutlineFilter).color = 0xf0e68c;
  finger.localTransform
    .rotate(Math.PI + Math.PI / 8)
    .scale(0.5, 0.5)
    .translate(470, 130);

  const h2 = genBasic(app, res["human"].texture, "human").sprite;
  h2.localTransform.translate(465, 100);

  const c = genBasic(app, res["company"].texture, "company").sprite;
  c.localTransform.translate(520, 75);

  const txt2 = createText("何人運べるかな？", 45, 0x000000).sprite;
  txt2.localTransform.translate(210, 180);

  [r, h1, bg, rCon, train, st1, st2, h2, c, txt1, finger, txt2].forEach((_) =>
    container.addChild(_)
  );

  return {
    sprite: container,
    width: 816 * 0.8,
    height: 250,
  };
};

export default createTitle;
