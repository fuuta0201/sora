import { CATEGORY_LIST } from "@/utils/constants";

const getJstDayNumber = () => {
  // JSTに変換して日単位に丸める
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return Math.floor(jst.getTime() / (24 * 60 * 60 * 1000));
};

// ランダムにカテゴリー名取得
export const getRandomCategory = (): string => {
  const day = getJstDayNumber();

  // Linear Congruential Generator (LCG)アルゴリズムによりランダム分布生成
  const mixed = (day * 1103515245 + 12345) >>> 0;

  return CATEGORY_LIST[mixed % CATEGORY_LIST.length];
};
