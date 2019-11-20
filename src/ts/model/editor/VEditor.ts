import { VNode } from "../content/VNode";

import { VContent } from "../content/VContent";
import { VStyleData, VStyle } from "../content/VStyle";
import { VSelection, VSelectionData } from "../selection/VSelection";
import { CommandType } from "../command/Commands";


export class VEditor {

  public content: VContent = new VContent();
  public currStyle: VStyle = new VStyle();
  public selection: VSelection = new VSelection();

  constructor() {

  }

  public oninput(data: string) {
    const anchor = this.selection.anchorNode;
    console.log('anchor: ', anchor, 'data: ', data);
    if ( ! anchor) {
      //TODO
      return;
    }
    this.content.text = data;
    // if ( ! VStyle.equals(this.currStyle, anchor.style)) {
    //   //TODO
    // }
    
  }

  public onselectionchange(sel: VSelectionData) {
    this.selection.setSelection(sel);
    this._updateStyleBySelection();
  }

  public execCommand(command: CommandType) {
    
  }

  private _updateStyleBySelection() {
    const sel = this.selection;
    if ( ! sel.anchorNode || ! sel.focusNode) return;
    
  }

  public setStyle() {
    
  }

}