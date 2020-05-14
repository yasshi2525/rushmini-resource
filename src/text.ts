import * as PIXI from "pixi.js";
import { OutlineFilter } from "pixi-filters";

const createText = (text: string, size: number) => {
  const border = size / 8;
  const style = new PIXI.TextStyle({
    fontFamily: "mplus",
    fontSize: size,
  });
  const top = new PIXI.Text(text, style);
  top.localTransform.translate(border, border);
  const f = new OutlineFilter(border, 0xffffff, 1);
  f.padding = border;
  top.filters = [f];
  return {
    sprite: top,
    width: top.width + border * 2,
    height: top.height + border * 2,
  };
};

export default createText;
