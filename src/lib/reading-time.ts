const WORDS_PER_MINUTE = 230;
const CJK = /[぀-ヿ㐀-䶿一-鿿豈-﫿]/g;

export function readingTime(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
  const cjk = (text.match(CJK) ?? []).length;
  const words = text.replace(CJK, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil((words + cjk) / WORDS_PER_MINUTE));
}
