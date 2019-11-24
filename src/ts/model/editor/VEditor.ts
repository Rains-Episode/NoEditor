import { VNode } from "../content/VNode";

import { VRoot } from "../content/VRoot";
import { VStyleData, VStyle } from "../content/VStyle";
import { VSelection, VSelectionData } from "../selection/VSelection";
import { CommandType, execCommand } from "../command/Commands";


export class VEditor {

  private _$root: VRoot = new VRoot();
  public get $root(): VRoot { return this._$root };

  public currStyle: VStyle = new VStyle();
  public selection: VSelection = new VSelection();

  constructor() {

  }

  public oninput(data: string) {
    const aNode = this.selection.anchorNode;
    const aOffset = this.selection.anchorOffset;
    console.log('anchor: ', aNode, 'data: ', data);
    if ( ! aNode) return;
    if (this.selection.isCollapsed) {
      //仅有光标情况
      let str = '';
      if ( ! aNode.text.length) str = data;
      else if (aOffset >= aNode.text.length) str = `${aNode.text}${data}`
      else {
        for (let i = 0; i < aNode.text.length; i++) {
          str += `${i === aOffset ? data : ''}${aNode.text[i]}`
        }
      }
      aNode.text = str;
    } else {
      //TODO 选中了一部分区域情况
    }
  }

  public onselectionchange(sel: VSelectionData) {
    this.selection.setSelection(sel);
    this._updateStyleBySelection();
  }

  public execCommand(cmd: CommandType) {
    const sel = this.selection;
    if (sel.isCollapsed) {
      //TODO
    } else if (sel.anchorNode === sel.focusNode) {
      const vnode = sel.anchorNode;
      if (sel.anchorOffset === vnode.text.length || 
          sel.focusOffset === vnode.text.length) {
        execCommand(cmd, vnode);
      } else {
        const nodes = VNode.splitNode(vnode, [sel.anchorOffset, sel.focusOffset]);
        console.log(nodes);
      }
    } else {

    }
  }

  private _updateStyleBySelection() {
    const sel = this.selection;
    if ( ! sel.anchorNode || ! sel.focusNode) return;
    
  }

  public setStyle() {
    
  }

}