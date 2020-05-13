import * as PIXI from "pixi.js";
import { OutlineFilter } from "pixi-filters";

const w = 816;
const h = 624;
const b = 9;

const createFrame = (x: number, y: number) => {
  const g = new PIXI.Graphics();
  g.lineStyle(b, 0x000000);
  g.drawRect(b, b, w * x, h * y);
  g.filters = [b].map((b, idx) => {
    const f = new OutlineFilter(b, idx % 2 ? 0x000000 : 0xffffff);
    f.padding = b;
    return f;
  });
  g.localTransform.translate(5, 5);
  return { sprite: g, width: w * x + b * 3, height: h * y + b * 3 };
};

export default createFrame;
