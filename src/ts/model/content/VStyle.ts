
export type VStyleData = Record<string, string>
export class VStyle {
  public static equals(vstyleA: VStyleData, vstyleB: VStyleData) {
    const v1 = {};
    const v2 = {};
    for (let i in vstyleA) vstyleA.hasOwnProperty(i) && (v1[i] = vstyleA[i]);
    for (let i in vstyleB) vstyleB.hasOwnProperty(i) && (v2[i] = vstyleB[i]);
    return JSON.stringify(v1) === JSON.stringify(v2);
  }
}
