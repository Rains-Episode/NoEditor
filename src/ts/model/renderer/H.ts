import { VNode } from "../content/VNode";


export class $domApi {
  static createElement(tag: string) {
    return document.createElement(tag);
  }
  static isTextNode (node: Node): boolean {
    return node && (node.nodeType === Node.TEXT_NODE || node instanceof Text);
  }
  static setCaretPos(node: Node, pos: number) {

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
    const ele = $domApi.createElement('div');
    ele.textContent = vnode.text;
    ele[$h.__VNODE_SIGN] = vnode;
    for (let i = 0; i < vnode.children.length; i++) 
      ele.appendChild($h.renderNode(vnode.children[i]));
    return ele;
  }
}

export const VNodeElementMap = {
  
}
