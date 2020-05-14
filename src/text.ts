import * as PIXI from "pixi.js";
import { OutlineFilter } from "pixi-filters";

const resolustion = 1;

const createText = (text: string, size: number, color: number = 0x000000) => {
  const border = size / 8;
  const style = new PIXI.TextStyle({
    fontFamily: "mplusP",
    fontSize: size * resolustion,
  });
  const top = new PIXI.Text(text, style);
  top.style.fill = color;
  top.localTransform
    .scale(1 / resolustion, 1 / resolustion)
    .translate(border, border);
  const f = new OutlineFilter(border, 0xffffff, 1);
  f.padding = border;
  top.filters = [f];
  return {
    sprite: top,
    width: top.width / resolustion + border * 2,
    height: top.height / resolustion + border * 2,
  };
};

export default createText;
