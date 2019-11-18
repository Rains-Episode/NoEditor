import { VNode } from "./VNode";
import { VRangeData } from "../selection/VSelection";

export type VStyleData = Record<string, any>;

export class VStyle {

  private _data: VStyleData;
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
}
