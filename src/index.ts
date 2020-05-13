import * as PIXI from "pixi.js";
import genBasic from "./basic";
import genCandidate from "./candidate";
import genCovered from "./covered";

const keys = ["residence", "company", "station", "train", "human"];
const generators: {
  [index: string]: (
    app: PIXI.Application,
    txt: PIXI.Texture,
    key: string
  ) => {
    sprite: PIXI.DisplayObject;
    width: number;
    height: number;
  };
} = { basic: genBasic, candidate: genCandidate, covered: genCovered };

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
        app.stage.addChild(sprite.sprite);
        app.view.width = sprite.width;
        app.view.height = sprite.height;
        app.renderer.render(app.stage);
        document.body.appendChild(download(app, suffix, key));
        app.stage.removeChildren();
      }
    });
  });
});
