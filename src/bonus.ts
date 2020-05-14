import * as PIXI from "pixi.js";
import { OutlineFilter, ColorOverlayFilter } from "pixi-filters";

type Config = {
  scale?: number;
  topText: string;
  bottomText: string;
  border?: boolean;
};

const outBorder = 5;
const fontSize = 25;

const configs: { [index: string]: Config } = {
  station: {
    scale: 0.5,
    topText: "新駅",
    bottomText: "開業",
  },
  rail: {
    scale: 0.25,
    topText: "支線",
    bottomText: "建設",
    border: false,
  },
  train: {
    scale: 0.5,
    topText: "電車",
    bottomText: "増発",
  },
  residence: {
    scale: 0.5,
    topText: "宅地",
    bottomText: "開発",
  },
};

/**
 * ボタン背景
 * @param conf
 * @param txt
 * @param enabled
 */
const createBackground = (
  conf: Config,
  txt: PIXI.Texture,
  enabled: boolean
) => {
  const background = new PIXI.Graphics();
  background.lineStyle(0);
  background.beginFill(enabled ? 0x008000 : 0xdcdcdc);
  background.drawRoundedRect(
    outBorder * 2,
    outBorder * 2,
    txt.width * (conf.scale ?? 1) - outBorder * 4,
    txt.height * (conf.scale ?? 1) - outBorder * 4,
    20
  );
  background.endFill();
  return background;
};

/**
 * ボタン外枠
 * @param conf
 * @param txt
 * @param enabled
 */
const createBorder = (conf: Config, txt: PIXI.Texture, enabled: boolean) => {
  const border = new PIXI.Graphics();
  border.lineStyle(outBorder, enabled ? 0x006400 : 0xd3d3d3);
  border.drawRoundedRect(
    outBorder * 2,
    outBorder * 2,
    txt.width * (conf.scale ?? 1) - outBorder * 4,
    txt.height * (conf.scale ?? 1) - outBorder * 4,
    20
  );
  const f = new OutlineFilter(outBorder, 0xffffff, 1);
  f.padding = outBorder;
  border.filters = [f];
  return border;
};

/**
 * ボタンアイコン
 * @param conf
 * @param txt
 * @param enabled
 */
const createIcon = (conf: Config, txt: PIXI.Texture, enabled: boolean) => {
  const sprite = new PIXI.Sprite(txt);
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  sprite.localTransform
    .scale(conf.scale * 0.5, conf.scale * 0.5)
    .translate(
      (txt.width * (conf.scale ?? 1)) / 2,
      (txt.height * (conf.scale ?? 1)) / 2
    );
  sprite.filters = [];
  // 無効時は画像を灰色に
  if (!enabled) {
    const f = new ColorOverlayFilter(0xf5f5f5);
    sprite.filters.push(f);
  }
  // 黒枠
  if (conf.border !== false) {
    const f = new OutlineFilter(3, enabled ? 0x000000 : 0xdcdcdc, 1);
    f.padding = 3;
    sprite.filters.push(f);
  }
  // 白枠
  const f = new OutlineFilter(5, 0xffffff, 1);
  f.padding = 5;
  sprite.filters.push(f);
  return sprite;
};

const resolusion = 4;

/**
 * テキスト
 * @param conf
 * @param txt
 * @param enabled
 */
const createText = (conf: Config, txt: PIXI.Texture, enabled: boolean) => {
  const style = new PIXI.TextStyle({
    fontFamily: "mplusP",
    fontSize: fontSize * resolusion,
  });

  const top = new PIXI.Text(conf.topText, style);
  top.localTransform
    .scale(1 / resolusion, 1 / resolusion)
    .translate(outBorder * 4, outBorder * 2);

  const buttom = new PIXI.Text(conf.bottomText, style);
  buttom.localTransform
    .scale(1 / resolusion, 1 / resolusion)
    .translate(
      txt.width * (conf.scale ?? 1) - fontSize * 2 - outBorder * 4,
      txt.height * (conf.scale ?? 1) - fontSize - outBorder * 5
    );

  return [top, buttom].map((t) => {
    t.style.fill = enabled ? 0x006400 : 0xd3d3d3;
    const f = new OutlineFilter(5, 0xffffff, 1);
    f.padding = 5;
    t.filters = [f];
    return t;
  });
};

const genBonus = (
  app: PIXI.Application,
  txt: PIXI.Texture,
  key: string,
  enabled: boolean
) => {
  if (!(key in configs)) {
    return undefined;
  }
  const conf = configs[key];

  const container = new PIXI.Container();
  container.addChild(createBackground(conf, txt, enabled));
  container.addChild(createIcon(conf, txt, enabled));
  container.addChild(createBorder(conf, txt, enabled));

  // テキスト
  createText(conf, txt, enabled).forEach((t) => container.addChild(t));

  return {
    sprite: container,
    width: txt.width * (conf.scale ?? 1),
    height: txt.height * (conf.scale ?? 1),
  };
};

export const genEnabledBonus = (
  app: PIXI.Application,
  txt: PIXI.Texture,
  key: string
) => genBonus(app, txt, key, true);

export const genDisabledBonus = (
  app: PIXI.Application,
  txt: PIXI.Texture,
  key: string
) => genBonus(app, txt, key, false);
