export type VStyleData = Record<string, any>;

export class VStyle {

  private _data: VStyleData = {};
  public get data(): VStyleData { return this._data; }

  public clearStyle() {
    this._data = {};
  }

  public hasStyle(key: string): boolean {
    return this._data[key] !== void 0;
  }

  public appendStyle(key: string, value: any) {
    if ( ! key || value === void 0) return;
    this._data[key] = value;
  }

  public removeStyle(key: string) {
    if ( ! this.hasStyle(key)) return;
    delete this._data[key];
  }

  public static getCommonStyle(vstyles: VStyle[]) {
    const com = {};
    for (let i = 0; i < vstyles.length; i++) {
      for (let j in vstyles[i].data) {
        const obj = {};
        obj[j] = vstyles[i].data[j];
        const key = JSON.stringify(obj);
        com[key] ? com[key]++ : (com[key] = 1);
      }
    }
    const arr = [];
    for (let i in com)
      if (com[i] >= vstyles.length) arr.push(JSON.parse(i));
    return arr;
  }

  public static equals(vstyleA: VStyle, vstyleB: VStyle) {
    return JSON.stringify(vstyleA.data) === JSON.stringify(vstyleB.data);
  }
}
