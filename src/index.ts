import "./app.css";
import * as PIXI from "pixi.js";
import genBasic from "./basic";
import genCandidate from "./candidate";
import genCovered from "./covered";
import { genEnabledBonus, genDisabledBonus } from "./bonus";
import createFrame from "./frame";
import createText from "./text";
import createBitmapFont from "./bitmap_font";
import createTitle from "./titile";
import createInstruction from "./instraction";
import createBonusIcon from "./bonus_icon";
import createMinimizeIcon from "./minimize";

const keys = [
  "residence",
  "company",
  "station",
  "train",
  "human",
  "rail",
  "finger",
  "finger_touch",
  "full",
  "bored",
  "arrow",
  "help",
  "close",
  "bonus",
];

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
  render(app, "img", "minimize", createMinimizeIcon(app));
  render(app, "icon", "bonus", createBonusIcon(app));
  render(app, "main", "frame", createFrame(0.8, 0.8));
  render(app, "txt", "title", createText("出勤のお時間です！", 80));
  render(app, "img", "title", createTitle(app));
  render(app, "img", "instruction", createInstruction(app));
  render(app, "txt", "start", createText("タップorクリックでスタート", 25));
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
    createText("路線をスワイプorドラッグ＆ドロップで敷こう！", 25)
  );
  render(
    app,
    "txt",
    "station",
    createText("線路をタップorクリックして新駅を建設しよう！", 25)
  );
  render(
    app,
    "txt",
    "branch",
    createText(
      "分岐させたい駅からスワイプorドラッグ＆ドロップして延伸しよう！",
      20
    )
  );
  render(
    app,
    "txt",
    "residence",
    createText("マップをタップorクリックして住宅を建設しよう！", 25)
  );
  [
    "住民",
    "出勤成功",
    "乗車時間",
    "電車待ち",
    "駅入場待ち",
    "電車混雑",
    "改札混雑",
    "ホーム混雑",
  ].forEach((label, idx) =>
    render(app, "txt", `statics_${idx}`, createText(label, 20))
  );
  render(app, "txt", "ending", createText("終了！", 60));
  render(app, "txt", "replay", createText("もう一回", 40));
  render(
    app,
    "main",
    "score",
    createBitmapFont("TIME SCORE:0123456789人秒％", 0x000000, 20)
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
