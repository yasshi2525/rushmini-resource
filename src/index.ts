import * as PIXI from "pixi.js";
import { OutlineFilter } from "pixi-filters";

const config: { [index: string]: { border: number[]; inverse: boolean } } = {
  residence: {
    border: [10, 11, 10, 10],
    inverse: false,
  },
  company: {
    border: [10, 11, 10, 10],
    inverse: false,
  },
  station: {
    border: [10, 11, 10, 10],
    inverse: false,
  },
  train: {
    border: [11.5, 10, 10, 10],
    inverse: false,
  },
  human: {
    border: [10, 11, 10, 10],
    inverse: true,
  },
};

const sprite = (
  app: PIXI.Application,
  txt: PIXI.Texture,
  conf: { border: number[]; inverse: boolean }
) => {
  const s = new PIXI.Sprite(txt);
  s.x = app.view.width / 2;
  s.y = app.view.height / 2;
  s.anchor.set(0.5, 0.5);
  if (conf.inverse) {
    s.scale.x = -1;
  }

  s.filters = conf.border.map((w, i) => {
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
  a.download = `${res}.png`;
  div.appendChild(a);
  return div;
};

Object.entries(config).forEach(([typ, conf]) => {
  const app = new PIXI.Application({
    width: 512,
    height: 512,
    transparent: true,
    preserveDrawingBuffer: true,
  });
  app.view.id = `${typ}.png`;

  app.loader.add(typ, `img/${typ}.png`).load((_, res) => {
    app.stage.addChild(sprite(app, res[typ].texture, conf));
    app.renderer.render(app.stage);
    document.body.appendChild(download(app, typ));
  });

  document.body.appendChild(app.view);
});
