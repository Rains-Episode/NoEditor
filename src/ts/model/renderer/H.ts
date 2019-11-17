import { VNode } from "../content/VNode";


export class $domApi {
  static createElement(tag: string) {
    return document.createElement(tag);
  }
  
  static isTextNode (node: Node): boolean {
    return node && (node.nodeType === Node.TEXT_NODE || node instanceof Text);
  }

  static isFocusOnEle(focus: Element | Node, ele: Element): boolean {
    return focus === ele || ($domApi.isTextNode(focus) && focus.parentElement === ele);
  }

  // ===== 4 selection ===== 
  static setSelection(anchorNode: Node, anchorOffset: number, focusNode: Node, focusOffset: number) { 
    const sel = window.getSelection();
    sel.removeAllRanges();
    const range = document.createRange();
    range.setStart(anchorNode, anchorOffset);
    range.setEnd(focusNode, focusOffset);
    sel.addRange(range);
  }
  static setCaretPos(node: Node, pos: number) {
    const sel = window.getSelection();
    sel.removeAllRanges();
    const range = document.createRange();
    range.setStart(node, pos);
    range.collapse();
    sel.addRange(range);
  }


  static setStyle() {
    //TODO
  }
}

/**
 * 
 */
export class $h {

  static __VNODE_SIGN = 'NoEditor__VNODE__';

  static isVNode(vnode: any): boolean {
    return vnode instanceof VNode;
  }

  static isSameVNode(nodeA: VNode, nodeB: VNode): boolean {
    return nodeA.key === nodeB.key;
  }

  static getVNodeByEle(ele: Element | Node): VNode {
    return ele[$h.__VNODE_SIGN];
  }

  static createElement(vnode: VNode) {
    const ele = document.createElement('span');
    //TODO
    return ele;
  }

  static updateChildren() {
    //TODO
  }

  static patchVNode() {
    //TODO
  }

  static patch(oldNode: any, vnode: VNode) {
    //TODO need some hooks
    if ( ! $h.isVNode(oldNode)) {
      oldNode = $h.getVNodeByEle(oldNode);
    }
    if ($h.isSameVNode(oldNode, vnode)) {
      
    }
  }

  static renderNode(vnode: VNode) {
    const ele = vnode.entity || $domApi.createElement('div');
    vnode.entity || (vnode.entity = ele);
    ele.textContent = vnode.text;
    ele[$h.__VNODE_SIGN] = vnode;
    for (let i = 0; i < vnode.children.length; i++) 
      ele.appendChild($h.renderNode(vnode.children[i]));
    return ele;
  }
}

export const VNodeElementMap = {
  
}
