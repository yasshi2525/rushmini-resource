import "./app.css";
import * as PIXI from "pixi.js";
import genBasic from "./basic";
import genCandidate from "./candidate";
import genCovered from "./covered";
import { genEnabledBonus, genDisabledBonus } from "./bonus";
import createFrame from "./frame";

const keys = ["residence", "company", "station", "train", "human", "rail"];

type SpriteResult = {
  sprite: PIXI.DisplayObject;
  width: number;
  height: number;
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
  app.stage.removeChildren();
};

const app = new PIXI.Application({
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
});
