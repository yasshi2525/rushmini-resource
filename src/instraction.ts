import * as PIXI from "pixi.js";
import genBasic from "./basic";
import { ColorOverlayFilter, OutlineFilter } from "pixi-filters";
import createText from "./text";

const createBored = (app: PIXI.Application) => {
  const container = new PIXI.Container();
  const res = app.loader.resources;

  const c = genBasic(app, res["company"].texture, "company").sprite;
  c.localTransform.scale(0.5, 0.5).translate(195, 10);

  const h = genBasic(app, res["bored"].texture, "bored").sprite;
  h.filters = [new ColorOverlayFilter(0xcccccc), ...h.filters];
  h.localTransform.translate(95, 70);

  const r = genBasic(app, res["residence"].texture, "residence").sprite;
  r.localTransform.scale(2, 2).translate(-15, 5);

  [r, h, c].forEach((_) => container.addChild(_));
  return container;
};

const createRail = (app: PIXI.Application) => {
  const container = new PIXI.Container();
  const res = app.loader.resources;

  const st1 = genBasic(app, res["station"].texture, "station").sprite;
  st1.localTransform.translate(0, 0);

  const rCon = new PIXI.Container();
  for (let i = 0; i < 2; i++) {
    const rail = new PIXI.Sprite(res["rail"].texture);
    rail.localTransform
      .rotate(Math.PI / 2)
      .scale(0.125, 0.06)
      .translate(i * 60, 50);
    rCon.addChild(rail);
  }
  rCon.localTransform.translate(150, 0);

  const st2 = genBasic(app, res["station"].texture, "station").sprite;
  st2.localTransform.translate(200, 0);

  const train = genBasic(app, res["train"].texture, "train").sprite;
  train.localTransform.translate(100, 0);

  [st1, rCon, st2, train].forEach((_) => container.addChild(_));
  return container;
};

const createScore = (value: string, color: number) => {
  const style = new PIXI.TextStyle({
    fontFamily: "mplus",
    fontSize: 80,
  });
  const text = new PIXI.Text(value, style);
  text.style.fill = color;
  const f0 = new OutlineFilter(1, color, 1);
  f0.padding = 1;
  const f1 = new OutlineFilter(4, 0xffffff, 1);
  f1.padding = 5;
  text.filters = [f0, f1];
  text.localTransform.scale(0.25, 0.25);
  return text;
};

const createPayment = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const container = new PIXI.Container();
  const st = genBasic(app, res["station"].texture, "station").sprite;
  st.localTransform.scale(1.25, 1.25).translate(-10, 0);
  const h = genBasic(app, res["human"].texture, "human").sprite;
  h.localTransform.scale(1.5, 1.5).translate(75, 20);

  const text = createScore("+得点", 0x000000);
  text.localTransform.translate(90, 0);

  [st, h, text].forEach((_) => container.addChild(_));
  return container;
};

const createDeath = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const container = new PIXI.Container();
  const h = genBasic(app, res["human"].texture, "human").sprite;
  h.alpha = 0.75;
  h.localTransform.scale(1.5, 1.5);
  const text = createScore("-10", 0xff0000);
  text.localTransform.translate(25, -15);
  [h, text].forEach((_) => container.addChild(_));
  return container;
};

const createInstruction = (app: PIXI.Application) => {
  const res = app.loader.resources;
  const container = new PIXI.Container();
  const bored = createBored(app);
  bored.localTransform.translate(25, 5);

  const msg1 = createText("会社が遠い！", 45, 0x000000).sprite;
  msg1.localTransform.translate(300, 25);
  const msg2 = createText("通勤したくない人多発", 35, 0x000000).sprite;
  msg2.localTransform.translate(350, 95);

  const arrow = genBasic(app, res["arrow"].texture, "arrow").sprite;
  arrow.localTransform.translate(816 * 0.45 - arrow.width / 8 / 2, 160);

  const rail = createRail(app);
  rail.localTransform.translate(0, 275);

  const msg3 = createText("鉄道を敷いて、", 45, 0x000000).sprite;
  msg3.localTransform.translate(300, 235);
  const msg4 = createText("出勤をお手伝い！", 45, 0x000000).sprite;
  msg4.localTransform.translate(350, 310);

  const payment = createPayment(app);
  payment.localTransform.translate(25, 425);

  const msg5 = createText("駅から降りると、", 25).sprite;
  msg5.localTransform.translate(200, 430);
  const msg6 = createText("運賃の分＋得点", 25).sprite;
  msg6.localTransform.translate(200, 470);

  const death = createDeath(app);
  death.localTransform.translate(425, 440);
  const msg7 = createText("疲れ果てると-10", 25, 0xff0000).sprite;
  msg7.localTransform.translate(510, 460);

  [
    bored,
    msg1,
    msg2,
    arrow,
    rail,
    msg3,
    msg4,
    payment,
    msg5,
    msg6,
    death,
    msg7,
  ].forEach((_) => container.addChild(_));
  return {
    sprite: container,
    width: 816 * 0.9,
    height: 624 * 0.9,
  };
};

export default createInstruction;
