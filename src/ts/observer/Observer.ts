import { Watcher } from "./watcher";

export class Observer {

  private _data: any;
  private _proxy: any;
  private _watcher: Watcher

  constructor(data: any) {
    this._data = data;
    this._proxy = new Proxy(this._data, {
      get: (target, name) => {
        return target[name];
      },
      set: (target, name, value) => {
        if (value === target[name]) return;
        target[name] = value;
        
        return true;
      }
    })
  }

}