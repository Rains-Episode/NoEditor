import { VNode } from "../content/VNode";

import { VContent } from "../content/VContent";
import { VStyleData, VStyle } from "../content/VStyle";
import { VSelection, VSelectionData } from "../selection/VSelection";
import { VText } from "../content/VText";


export class VEditor {
  public content: VContent = new VContent();
  public currStyle: VStyleData = {};
  public selection: VSelection = new VSelection();

  constructor() {
    
  }

  public oninput(data: string) {
    
    // const anchor = this.selection.anchorNode;
    // if ( ! anchor) {
    //   //TODO 
    //   return;
    // }
    // if ( ! VStyle.equals(this.currStyle, anchor.style)) {
    //   //TODO
    // }
    // if (anchor instanceof VText) {
    //   (anchor as VText).changeText(data);
    // } else {
    // }
  }

  public onselectionchange(sel: VSelectionData) {
    this.selection.setSelection(sel);
    this._updateStyle();
  }

  private _updateStyle() {
    const sel = this.selection;
    if ( ! sel.anchorNode || ! sel.focusNode) return;
  }

}