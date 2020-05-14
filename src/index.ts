import "./app.css";
import * as PIXI from "pixi.js";
import genBasic from "./basic";
import genCandidate from "./candidate";
import genCovered from "./covered";
import { genEnabledBonus, genDisabledBonus } from "./bonus";
import createFrame from "./frame";
import createText from "./text";
import createBitmapFont from "./bitmap_font";

const keys = ["residence", "company", "station", "train", "human", "rail"];

type SpriteResult = {
  sprite: PIXI.DisplayObject;
  width: number;
  height: number;
  glyph?: Object;
};

const generators: {
  [index: string]: (
    app: PIXI.Application,
    txt: PIXI.Texture,
    key: string
  ) => SpriteResult;
} = {
  bonus_enabled: genEnabledBonus,
  bonus_disabled: genDisabledBonus,
  basic: genBasic,
  candidate: genCandidate,
  covered: genCovered,
};

const download = (app: PIXI.Application, suffix: string, res: string) => {
  const div = document.createElement("div");
  const image = document.createElement("img");
  image.src = app.view.toDataURL();

  const a = document.createElement("a");
  a.append(image);
  a.href = app.view.toDataURL();
  a.download = `${res}_${suffix}.png`;
  div.appendChild(a);
  return div;
};

const render = (
  app: PIXI.Application,
  suffix: string,
  key: string,
  sprite: SpriteResult
) => {
  app.stage.addChild(sprite.sprite);
  app.view.width = sprite.width;
  app.view.height = sprite.height;
  app.renderer.render(app.stage);
  document.body.appendChild(download(app, suffix, key));
  if (sprite.glyph) {
    const a = document.createElement("a");
    a.text = "glyph";
    a.download = `${key}_${suffix}_glyphs.json`;
    a.href =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(sprite.glyph));
    document.body.appendChild(a);
  }
  app.stage.removeChildren();
};

const app = new PIXI.Application({
  //backgroundColor: 0xaaaaaa,
  transparent: true,
  preserveDrawingBuffer: true,
});

keys.forEach((key) => app.loader.add(key, `img/${key}.png`));

app.loader.load((_, res) => {
  keys.forEach((key) => {
    Object.entries(generators).forEach(([suffix, gen]) => {
      const sprite = gen(app, res[key].texture, key);
      if (sprite) {
        render(app, suffix, key, sprite);
      }
    });
  });

  render(app, "main", "frame", createFrame(0.8, 0.8));
  render(app, "txt", "title", createText("出勤のお時間です！", 80));
  render(app, "txt", "bonus", createText("ボーナスを1つ選んでください", 30));
  render(
    app,
    "txt",
    "rollback",
    createText("やりなおしてください", 30, 0xff0000)
  );
  render(app, "txt", "available", createText("しばらくお待ちください...", 30));
  render(
    app,
    "txt",
    "build",
    createText("スワイプorドラッグ＆ドロップで路線を敷こう！", 25)
  );
  render(
    app,
    "main",
    "score",
    createBitmapFont("TIME SCORE:0123456789", 0x000000, 20)
  );
  render(
    app,
    "positive",
    "score",
    createBitmapFont("+0123456789", 0x000000, 15)
  );
  render(
    app,
    "negative",
    "score",
    createBitmapFont("-0123456789", 0xff0000, 15)
  );
});
