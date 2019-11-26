import { VStyle } from "./VStyle";
import { Pool } from "../utils/Pool";

let $VNodeKey: number = 0;

export class VNode {
  
  public entity: any;
  public parent: VNode;
  public children: Array<VNode> = [];

  public style: VStyle = new VStyle();
  
  private _text: string = '';
  private _key: string
  private _removed: boolean = false;
 
  public get text(): string { return this._text; }
  public get key(): string { return this._key; }
  public get removed(): boolean { return this._removed; }

  public set text(val: string) {
    for (let i = 0; i < this.children.length; i++) this.children[i].remove();
    this.children.length = 0;
    this._text = `${val || ''}`;
  }

  constructor() {
    this.resetKey();
  }

  public resetKey() {
    this._key = `${++$VNodeKey}`;
  }

  public static create(): VNode {
    const vnode = Pool.getByClass(VNode) as VNode;
    vnode.text = '';
    vnode.resetKey()
    return vnode;
  }

  public static remove(vnode: VNode) {
    Pool.recoverByClass(vnode);
  }

  public appendChild(vnode: VNode, index?: number): void {
    vnode.parent = this;
    index === void 0 ? this.children.push(vnode) : this.children.splice(index, 0, vnode);
  }

  public appendTo(vnode: VNode) {
    vnode.appendChild(this);
  }

  public remove(): void {
    this._removed = true;
    //TODO
  }


  public static getTreeLen(vnode: VNode): number {
    let len = 0;
    while (vnode = vnode.parent) len++;
    return len;
  }

  /**
   * closest common parent
   * @param vnodeA 
   * @param vnodeB 
   */
  public static ccp(vnodeA: VNode, vnodeB: VNode): VNode {
    let lenA = VNode.getTreeLen(vnodeA);
    let lenB = VNode.getTreeLen(vnodeB);
    for (; lenA > lenB; lenA--) vnodeA = vnodeA.parent;
    for (; lenB > lenA; lenB--) vnodeB = vnodeB.parent;
    while (vnodeA && vnodeB && vnodeA !== vnodeB) {
      vnodeA = vnodeA.parent;
      vnodeB = vnodeB.parent;
    }
    return vnodeA;
  }

  /**
   * 获取两个节点之间的节点
   * @param vnodeA 
   * @param vnodeB
   */
  public static getNodesBetween2Node(vnodeA: VNode, vnodeB: VNode): VNode[] {
    const arr = [];
    if (vnodeA === vnodeB) {
      arr.push(vnodeA);
    } else if (vnodeA.parent === vnodeB.parent) {
      const par = vnodeA.parent;
      let pushing = false;
      for (let i = 0, len = par.children.length; i < len; i++) {
        const isAB = par.children[i] === vnodeA || par.children[i] === vnodeB;
        if (isAB && ! pushing) pushing = true;
        pushing && arr.push(par.children[i]);
        if (isAB && pushing && arr.length > 1) break;
      }
    } else if (vnodeA === vnodeB.parent) {
      VNode.getNodesBetween2Node(vnodeA.children[0], vnodeB);
    } else if (vnodeA.parent === vnodeB) {
      VNode.getNodesBetween2Node(vnodeA, vnodeB.children[vnodeB.children.length - 1]);
    } else {
      let parA = vnodeA;
      let parB = vnodeB;
      let lenA = VNode.getTreeLen(parA);
      let lenB = VNode.getTreeLen(parB);
      for (; lenA > lenB; lenA--) parA = parA.parent;
      for (; lenB > lenA; lenB--) parB = parB.parent;
      while (parA && parB && parA.parent !== parB.parent) {
        parA = parA.parent;
        parB = parB.parent;
      }
      const ccp = parA.parent;
      let first: VNode;
      for (let i = 0, len = ccp.children.length; i < len; i++) 
        if (ccp.children[i] === parA || ccp.children[i] === parB) {
          first = ccp.children[i];
          break;
        }
      let chA = vnodeA;
      let chB = vnodeB;
      if (first === parA) {
        while (chA !== parA) {
          arr.push(VNode.getNodesBetween2Node(chA, chA.parent));
          chA = chA.parent;
        }
      } else {
        while (chB !== parB) {
          arr.push(VNode.getNodesBetween2Node(chB, chB.parent));
          chB = chB.parent;
        }
      }
      const nodesBetweenAB = VNode.getNodesBetween2Node(parA, parB);
      nodesBetweenAB.shift();
      nodesBetweenAB.pop();
      arr.push(nodesBetweenAB);
    }
    return arr;
  }

  public static splitNode(vnode: VNode, offsets: number[]): VNode[] {
    const str = vnode.text;
    if ( ! str || str.length <= 1) return;
    const ofs = [];
    // <=> offsets.filter(v => v > 0);
    // <=> offsets.sort((a, b) => a - b);
    for (let i = 0; i < offsets.length; i++) {
      if (offsets[i] <= 0) continue;
      ofs.push(offsets[i]);
      for (let j = ofs.length - 1; j >= 0 ; j--) {
        if (ofs[j] < ofs[j] - 1) {
          const t = ofs[j];
          ofs[j] = ofs[j - 1];
          ofs[j - 1] = t;
        }
      }
    }
    if ( ! ofs.length) return;
    const arr: string[] = [str.slice(0, ofs[0])];
    for (let i = 0; i < ofs.length; i++) {
      if (ofs[i] <= 0) continue;
      const text = str.slice(ofs[i], ofs[i + 1]);
      text && arr.push(text);
    }
    vnode.text = arr[0];
    const nodesArr = [vnode];
    const index = vnode.parent.children.indexOf(vnode);
    for (let i = 1; i < arr.length; i++) {
      const newNode = VNode.create();
      nodesArr.push(newNode);
      newNode.text = arr[i];
      vnode.parent.appendChild(newNode, index + i);
    }
    return nodesArr;
  }

  public static mergeNode(vnodes: VNode[]) {
    let canMerge = true;
    const par = vnodes[0].parent;
    const firstIndex = par.children.indexOf(vnodes[0]);
    for (let i = 1, len = vnodes.length; i < len; i++) {
      if (vnodes[i].parent !== par || vnodes[i] !== par.children[firstIndex + 1]) {
        canMerge = false;
        break;
      }
    }
    if ( ! canMerge) return;
    //TODO
  }
}