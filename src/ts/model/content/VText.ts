import { Pool } from "../utils/Pool";

import { VNode } from "./VNode";
import { VStyleData } from "./VStyle";

export class VText extends VNode {

  private _text: string = '';

  public text(): string { return this._text; }
  
  constructor() {
    super();
  }

  public static create(text: string = ''): VText {
    const vtext = Pool.getByClass(VText);
    text && vtext.changeText(text);
    return vtext;
  }

  public remove() {
    Pool.recoverByClass(this);
    super.remove();
  }

  public changeText(text: string) {
    if (text == void 0) return;
    this._text = text;
  }

}

