import "./app.css";
import * as PIXI from "pixi.js";
import genBasic from "./basic";
import genCandidate from "./candidate";
import genCovered from "./covered";
import { genEnabledBonus, genDisabledBonus } from "./bonus";
import createFrame from "./frame";
import createText from "./text";
import createBitmapFont from "./bitmap_font";
import createTitle from "./titile";
import createInstruction from "./instraction";
import createBonusIcon from "./bonus_icon";
import createMinimizeIcon from "./minimize";
import createUndoIcon from "./undo";
import { createSpeakerOn, createSpeakerOff } from "./speaker";
import createThanks from "./thanks";
import { createCrowed1, createCrowed2, createCrowedTrain } from "./crowed";
import { createAdviceOn, createAdviceOff } from "./advice";
import createPointer from "./pointer";

const keys = [
  "residence",
  "company",
  "station",
  "train",
  "human",
  "rail",
  "finger",
  "finger_touch",
  "full",
  "bored",
  "arrow",
  "help",
  "close",
  "bonus",
  "undo",
  "speaker_on",
  "speaker_off",
  "crowed_level1",
  "crowed_level2",
  "instructor",
  "advice_mode",
  "advice_on",
  "advice_off"
];

type SpriteResult = {
  sprite: PIXI.DisplayObject;
  width: number;
  height: number;
  glyph?: Object;
};

const generators: {
  [index: string]: (
    app: PIXI.Application,
    txt: PIXI.Texture,
    key: string
  ) => SpriteResult;
} = {
  bonus_enabled: genEnabledBonus,
  bonus_disabled: genDisabledBonus,
  basic: genBasic,
  candidate: genCandidate,
  covered: genCovered,
};

const download = (app: PIXI.Application, suffix: string, res: string) => {
  const div = document.createElement("div");
  const image = document.createElement("img");
  image.src = app.view.toDataURL();

  const a = document.createElement("a");
  a.append(image);
  a.href = app.view.toDataURL();
  a.download = `${res}_${suffix}.png`;
  div.appendChild(a);
  return div;
};

const render = (
  app: PIXI.Application,
  suffix: string,
  key: string,
  sprite: SpriteResult
) => {
  app.stage.addChild(sprite.sprite);
  app.view.width = sprite.width;
  app.view.height = sprite.height;
  app.renderer.render(app.stage);
  document.body.appendChild(download(app, suffix, key));
  if (sprite.glyph) {
    const a = document.createElement("a");
    a.text = "glyph";
    a.download = `${key}_${suffix}_glyphs.json`;
    a.href =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(sprite.glyph));
    document.body.appendChild(a);
  }
  app.stage.removeChildren();
};

const app = new PIXI.Application({
  //backgroundColor: 0xaaaaaa,
  transparent: true,
  preserveDrawingBuffer: true,
});

keys.forEach((key) => app.loader.add(key, `img/${key}.png`));
app.loader.load((_, res) => {
  keys.forEach((key) => {
    Object.entries(generators).forEach(([suffix, gen]) => {
      const sprite = gen(app, res[key].texture, key);
      if (sprite) {
        render(app, suffix, key, sprite);
      }
    });
  });
  render(app, "img", "crowed_level1", createCrowed1(app));
  render(app, "img", "crowed_level2", createCrowed2(app));
  render(app, "img", "crowed_train", createCrowedTrain(app));
  render(app, "img", "minimize", createMinimizeIcon(app));
  render(app, "icon", "bonus", createBonusIcon(app));
  render(app, "img", "undo", createUndoIcon(app));
  render(app, "img", "speaker_on", createSpeakerOn(app));
  render(app, "img", "speaker_off", createSpeakerOff(app));
  render(app, "main", "frame", createFrame(0.8, 0.8));
  render(app, "txt", "title", createText("出勤のお時間です！", 80));
  render(app, "img", "title", createTitle(app));
  render(app, "img", "instruction", createInstruction(app));
  render(app, "txt", "start", createText("タップorクリックでスタート", 25));
  render(app, "txt", "bonus", createText("ボーナスを1つ選んでください", 30));
  render(
    app,
    "txt",
    "rollback",
    createText("やりなおしてください", 30, 0xff0000)
  );
  render(app, "txt", "available", createText("しばらくお待ちください...", 30));
  render(
    app,
    "txt",
    "build",
    createText("路線をスワイプorドラッグ＆ドロップで敷こう！", 25)
  );
  render(
    app,
    "txt",
    "station",
    createText("線路をタップorクリックして新駅を建設しよう！", 25)
  );
  render(
    app,
    "txt",
    "branch",
    createText(
      "分岐させたい駅からスワイプorドラッグ＆ドロップして延伸しよう！",
      20
    )
  );
  render(
    app,
    "txt",
    "residence",
    createText("マップをタップorクリックして住宅を建設しよう！", 25)
  );
  [
    "住民",
    "出勤成功",
    "乗車時間",
    "電車待ち",
    "駅入場待ち",
    "電車混雑",
    "改札混雑",
    "ホーム混雑",
  ].forEach((label, idx) =>
    render(app, "txt", `statics_${idx}`, createText(label, 20))
  );
  render(app, "txt", "ending", createText("終了！", 60));
  render(app, "txt", "replay", createText("もう一回", 40));
  render(app, "img", "advice_on", createAdviceOn(app));
  render(app, "img", "advice_off", createAdviceOff(app));
  render(app, "txt", "advice", createText("ガイド", 30));
  render(app, "txt", "advice_init_1", createText("左上の住宅から右下の会社に向かって出勤しとるようじゃな。", 22));
  render(app, "txt", "advice_init_2", createText("住宅から会社に向かって線路を敷いてあげるのじゃ！", 22));
  render(app, "txt", "advice_rollback_1", createText("おやっ？ちゃんと住民が利用したくなるような位置に", 22));
  render(app, "txt", "advice_rollback_2", createText("線路を敷いてあげているかの？", 22));
  render(app, "txt", "advice_opening_1", createText("鉄道の開業おめでとう！乗客が目的駅に着くとスコアが入るのじゃ。", 22));
  render(app, "txt", "advice_opening_2", createText("スコアがたまると鉄道を拡張できるぞい。", 22));
  render(app, "txt", "advice_scored_1", createText("駅から降りたので運賃収入が手に入ったぞい！", 22));
  render(app, "txt", "advice_scored_2", createText("", 22));
  render(app, "txt", "advice_crowded_train_1", createText("おやっ？電車が満員で人を載せきれていないようじゃな…", 22));
  render(app, "txt", "advice_crowded_train_2", createText("電車を増発して混雑を減らすのもアリじゃな！", 22));
  render(app, "txt", "advice_despawn_1", createText("おやっ？疲れ切って帰ってしまったようじゃな…", 22));
  render(app, "txt", "advice_despawn_2", createText("通勤に時間がかかりすぎていないか、チェックしてみるのじゃ。", 22));
  render(app, "txt", "advice_crowded_station_train_1", createText("おやっ？駅が満員で行列ができているようじゃな…", 22));
  render(app, "txt", "advice_crowded_station_train_2", createText("電車を増発して人の流れを良くするのもアリじゃな！", 22));
  render(app, "txt", "advice_crowded_station_1", createText("おやっ？駅が満員で行列ができているようじゃな…", 22));
  render(app, "txt", "advice_crowded_station_2", createText("新しく駅や支線を作って人を分散させるのもアリじゃな！", 22));
  render(app, "txt", "advice_directed_1", createText("おやっ？電車を利用してくれていないようじゃな…", 22));
  render(app, "txt", "advice_directed_2", createText("駅が遠かったり、路線が長すぎると不便で使ってもらえないようじゃ…", 22));
  render(app, "img", "advice_pointer", createPointer(app))
  render(
    app,
    "txt",
    "traindiscardbug_20200525_1",
    createText("線路の敷き方によって、電車の配置数が約3割程度", 25, 0xff0000)
  );
  render(
    app,
    "txt",
    "traindiscardbug_20200525_2",
    createText("少なくなってしまう問題を修正しました…ごめん！", 25, 0xff0000)
  );
  render(
    app,
    "txt",
    "traindiscardbug_20200525_3",
    createText("2020/05/25 22:00修正", 15, 0xff0000)
  );
  render(
    app,
    "main",
    "score",
    createBitmapFont("TIME SCORE:0123456789人秒％", 0x000000, 20)
  );
  render(
    app,
    "positive",
    "score",
    createBitmapFont("+0123456789", 0x000000, 15)
  );
  render(
    app,
    "negative",
    "score",
    createBitmapFont("-0123456789", 0xff0000, 15)
  );
  render(app, "img", "thanks", createThanks(app));
});
