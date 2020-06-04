import { OutlineFilter } from "pixi-filters";
import * as PIXI from "pixi.js";

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
    offsetY: -4,
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
    offsetY: -14,
    borders: [3, 5, 2, 5],
  },
  train: {
    scaleX: 0.25 - 0.0625,
    scaleY: 0.25 - 0.0625,
    stretchY: 0.75,
    offsetY: 6,
    borders: [2, 4, 2, 3],
  },
  human: {
    scaleX: 0.125,
    scaleY: 0.125,
    borders: [2, 4, 2, 3],
    inverse: true,
  },
  finger: {
    scaleX: 0.25,
    scaleY: 0.25,
    offsetX: 14,
    offsetY: 24,
    stretchX: 0.8,
    stretchY: 0.8,
    borders: [0, 5, 4, 10],
  },
  finger_touch: {
    scaleX: 0.25,
    scaleY: 0.25,
    borders: [0, 5, 5, 10],
  },
  full: {
    scaleX: 0.05,
    scaleY: 0.05,
    borders: [1, 2, 1, 2],
  },
  bored: {
    scaleX: 0.4,
    scaleY: 0.4,
    borders: [3, 4, 3, 4],
  },
  arrow: {
    scaleX: 0.125,
    scaleY: 0.1,
    borders: [5, 5],
  },
  help: {
    scaleX: 0.5,
    scaleY: 0.5,
    borders: [3, 4, 3, 4],
  },
  close: {
    scaleX: 0.25,
    scaleY: 0.25,
    borders: [3, 4, 3, 4],
  },
  bonus: {
    scaleX: 0.09,
    scaleY: 0.09,
    borders: [0.25],
  },
  undo: {
    scaleX: 0.08,
    scaleY: 0.08,
    borders: [0.5],
  },
  speaker_on: {
    scaleX: 0.1,
    scaleY: 0.1,
    borders: [0],
  },
  speaker_off: {
    scaleX: 0.1,
    scaleY: 0.1,
    borders: [0],
  },
  crowed_level1: {
    scaleX: 0.3,
    scaleY: 0.3,
    borders: [1.5, 4, 1.5, 4],
  },
  crowed_level2: {
    scaleX: 0.45,
    scaleY: 0.45,
    borders: [1.5, 5, 1.5, 4],
  },
  instructor: {
    scaleX: 0.175,
    scaleY: 0.175,
    borders: [0.5, 4]
  },
  advice_mode: {
    scaleX: 0.15,
    scaleY: 0.15,
    borders: [2, 4, 2, 4]
  },
  advice_on: {
    scaleX: 0.15,
    scaleY: 0.15,
    borders: [2, 4]
  },
  advice_off: {
    scaleX: 0.155,
    scaleY: 0.15,
    borders: [0, 4]
  }
};

const genBasic = (_, txt: PIXI.Texture, key: string) => {
  if (!(key in configs)) {
    return undefined;
  }
  const conf = configs[key];
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

  return {
    sprite: s,
    width: txt.width * (conf.scaleX ?? 1) + sum * 2,
    height: txt.height * (conf.scaleY ?? 1) + sum * 2,
  };
};

export default genBasic;
