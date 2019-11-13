import { VNode } from "./VNode";
import { VText } from "./VText";

export class VContent extends VNode {

  constructor() { 
    super();
  }

  public appendText(text: string, appendTo?: VText): VText {
    if ( ! text) return;
    if ( ! appendTo) {
      appendTo = new VText();
      this.appendChild(appendTo);
    }
    //TODO
    appendTo.changeText(text);
    return appendTo;
  }
}
