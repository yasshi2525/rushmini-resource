import * as PIXI from "pixi.js";
import { OutlineFilter } from "pixi-filters";

type Config = {
  size?: number;
  scaleX?: number;
  scaleY?: number;
  offsetX?: number;
  offsetY?: number;
  stretchX?: number;
  stretchY?: number;
  borders: number[];
  inverse?: boolean;
};

const configs: { [index: string]: Config } = {
  residence: {
    scaleX: 0.25,
    scaleY: 0.25,
    offsetY: 4,
    borders: [3, 5, 2, 5],
  },
  company: {
    scaleX: 0.25,
    scaleY: 0.25,
    borders: [3, 5, 2, 5],
  },
  station: {
    scaleX: 0.25,
    scaleY: 0.25,
    offsetY: 4,
    borders: [3, 5, 2, 5],
  },
  train: {
    scaleX: 0.25 - 0.0625,
    scaleY: 0.25 - 0.0625,
    stretchY: 0.75,
    offsetY: 14,
    borders: [2, 4, 2, 3],
  },
  human: {
    scaleX: 0.125,
    scaleY: 0.125,
    borders: [2, 4, 2, 3],
    inverse: true,
  },
};

const sprite = (app: PIXI.Application, txt: PIXI.Texture, conf: Config) => {
  const s = new PIXI.Sprite(txt);
  const sum = conf.borders.reduce((p, n) => p + n);
  if (conf.inverse) {
    s.anchor.set(1, 0);
    s.localTransform.scale(-1, 1);
  }

  s.localTransform
    .scale(conf.scaleX ?? 1, conf.scaleY ?? 1)
    .scale(conf.stretchX ?? 1, conf.stretchY ?? 1)
    .translate(sum, sum)
    .translate(conf.offsetX ?? 0, conf.offsetY ?? 0);

  s.filters = conf.borders.map((w, i) => {
    const outline = new OutlineFilter(w, i % 2 ? 0xffffff : 0x000000, 1);
    outline.padding = w;
    return outline;
  });

  return s;
};

const download = (app: PIXI.Application, res: string) => {
  const div = document.createElement("div");
  const a = document.createElement("a");
  a.text = `${res} をダウンロード`;
  a.href = app.view.toDataURL();
  a.download = `${res}_image.png`;
  div.appendChild(a);
  return div;
};

Object.entries(configs).forEach(([typ, conf]) => {
  const app = new PIXI.Application({
    transparent: true,
    preserveDrawingBuffer: true,
  });
  app.view.id = `${typ}.png`;

  app.loader.add(typ, `img/${typ}.png`).load((_, res) => {
    const txt = res[typ].texture;
    const sum = conf.borders.reduce((p, n) => p + n);
    app.view.width = txt.width * (conf.scaleX ?? 1) + sum * 2;
    app.view.height = txt.height * (conf.scaleY ?? 1) + sum * 2;
    app.stage.addChild(sprite(app, txt, conf));
    app.renderer.render(app.stage);
    document.body.appendChild(download(app, typ));
  });

  document.body.appendChild(app.view);
});
