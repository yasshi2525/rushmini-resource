import { DropShadowFilter, OutlineFilter } from "pixi-filters";
import * as PIXI from "pixi.js";
import genBasic from "./basic";

type Config = {
  borders: number[];
  shadow: number;
};

const configs: { [index: string]: Config } = {
  station: {
    borders: [4, 4, 4],
    shadow: 8,
  },
};

const genCandidate = (_, txt: PIXI.Texture, key: string) => {
  if (!(key in configs)) {
    return undefined;
  }
  const conf = configs[key];
  const basic = genBasic(_, txt, key);
  const s = basic.sprite;
  const sum = conf.borders.reduce((p, n) => p + n) + conf.shadow / 2;
  s.localTransform.translate(sum, sum);

  const white = s.filters.pop();

  const matrix = new PIXI.filters.ColorMatrixFilter();
  matrix.browni(true);

  s.filters.push(matrix);
  s.filters.push(white);

  conf.borders.map((w, i) => {
    const outline = new OutlineFilter(w, i % 2 ? 0xffff00 : 0x808000, 1);
    outline.padding = w;
    s.filters.push(outline);
  });
  s.filters.push(new DropShadowFilter({ distance: 6 }));
  return {
    sprite: basic.sprite,
    width: basic.width + sum * 2,
    height: basic.height + sum * 2,
  };
};
export default genCandidate;
