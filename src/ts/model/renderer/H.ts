import { VNode } from "../content/VNode";

/**
 * 
 */
class H {

  isVNode(vnode: any): boolean {
    return vnode instanceof VNode;
  }
  isSameVNode(nodeA: VNode, nodeB: VNode): boolean {
    return nodeA.key === nodeB.key;
  }

  getVNodeByElement(ele: Element): VNode {
    return new VNode();
  }

  createElement(vnode: VNode) {
    const ele = document.createElement('span');

    return ele;
  }
  updateChildren() {

  }

  patchVNode() {

  }
  patch(oldNode: any, vnode: VNode) {
    //TODO may need some hooks
    if ( ! this.isVNode(oldNode)) {
      oldNode = this.getVNodeByElement(oldNode);
    }
    if (this.isSameVNode(oldNode, vnode)) {
      
    }
  }
}

export const VNodeElementMap = {
  
}



