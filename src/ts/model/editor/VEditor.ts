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
      // 仅有光标情况
      if (aNode === this._$root) {
        // 如果focus on根节点 那就增加新的节点
        const vnode = VNode.create();
        vnode.text = data;
        this._$root.appendChild(vnode);
        this.selection.focusOn(vnode, vnode.text.length)
      } else {
        let str = '';
        // case 1: focus的节点还没有内容
        // case 2: focus节点的内容的结尾
        // case 3: focus节点的内容的中间
        if ( ! aNode.text.length) str = data;
        else if (aOffset >= aNode.text.length) str = `${aNode.text}${data}`
        else {
          for (let i = 0; i < aNode.text.length; i++) {
            str += `${i === aOffset ? data : ''}${aNode.text[i]}`
          }
        }
        aNode.text = str;
        this.selection.focusOn(aNode, aOffset + 1);
      }
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
        const node = nodes[Math.ceil(nodes.length / 2) - 1];
        execCommand(cmd, node);
        this.selection.selectOn(node);
        console.log(nodes);
      }
    } else {

    }
  }

  private _updateStyleBySelection() {
    console.log('=== update style by selection ===');
    const sel = this.selection;
    if ( ! sel.anchorNode || ! sel.focusNode) return;
    const nodes = VNode.getNodesBetween2Node(sel.anchorNode, sel.focusNode);
    
    console.log('selected nodes : ', nodes);
  }

  public setStyle() {
    
  }

}