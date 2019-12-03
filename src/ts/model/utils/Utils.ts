function splitString(str: string, offsets: number[]): string[] {
  let arr = [];
  for (let i = 0; i < offsets.length; i++) {
    if (offsets[i] <= 0) continue;
    arr.length || (arr = offsets[i] > 0 ? [str.slice(0, offsets[i])] : [])
    const text = str.slice(offsets[i], offsets[i + 1]);
    text && arr.push(text);
  }
  return arr;
}