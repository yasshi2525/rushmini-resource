import * as PIXI from "pixi.js";
import { OutlineFilter, ColorOverlayFilter, BloomFilter } from "pixi-filters";

const resolusion = 4;

const createBitmapFont = (chars: string, color: number, size: number) => {
  const container = new PIXI.Container();
  const border = size / 6;
  const style = new PIXI.TextStyle({
    fontFamily: "mplus",
    fontSize: size * resolusion,
  });
  const glyph = { map: {}, height: 0 };
  chars.split("").forEach((c, idx) => {
    const text = new PIXI.Text(c, style);
    text.style.fill = color;
    const f0 = new OutlineFilter(1, color, 1);
    f0.padding = 1;
    const f1 = new OutlineFilter(border, 0xffffff, 1);
    f1.padding = border;
    text.filters = [f0, f1];
    text.localTransform
      .scale(1 / resolusion, 1 / resolusion)
      .translate((size - text.width / resolusion) / 2, 0)
      .translate(border / 2, 0)
      .translate((size + border) * idx, 0);
    container.addChild(text);
    glyph.map[c.charCodeAt(0)] = {
      x: Math.floor((size + border) * idx),
      y: 0,
      width: Math.floor(size + border),
      height: Math.floor(container.height + border),
    };
  });
  glyph.height = Math.floor(container.height + border);
  return {
    sprite: container,
    width: chars.length * (size + border),
    height: container.height + border,
    glyph,
  };
};

export default createBitmapFont;
