import { ColorOverlayFilter } from "pixi-filters";
import * as PIXI from "pixi.js";
import genCandidate from "./candidate";
type Config = {};
const configs: { [index: string]: Config } = {
  station: {},
};

const genCovered = (app: PIXI.Application, txt: PIXI.Texture, key: string) => {
  if (!(key in configs)) {
    return undefined;
  }
  const conf = configs[key];

  const shape = genCandidate(app, txt, key);

  shape.sprite.filters.push(new ColorOverlayFilter(0xff0000));
  shape.sprite.filters.push(new PIXI.filters.AlphaFilter(0.4));
  app.stage.addChild(shape.sprite);
  app.renderer.render(app.stage);
  const tx = app.renderer.generateTexture(
    shape.sprite,
    PIXI.SCALE_MODES.NEAREST,
    app.renderer.resolution
  );

  app.stage.removeChild(shape.sprite);
  const container = new PIXI.Container();
  const basic = genCandidate(app, txt, key);

  container.addChild(basic.sprite);
  container.addChild(new PIXI.Sprite(tx));
  return { ...shape, sprite: container };
};

export default genCovered;
