import { VStyle } from "./VStyle";
import { Pool } from "../utils/Pool";

let $VNodeKey: number = 0;

export class VNode {

  public entity: any;
  public parent: VNode;
  public children: Array<VNode> = [];

  public style: VStyle;
  
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
    vnode.resetKey()
    return vnode;
  }

  public static remove(vnode: VNode) {
    Pool.recoverByClass(vnode);
  }

  public appendChild(child: VNode): void {
    child.parent = this;
    this.children.push(child);
  }

  public appendTo(vnode: VNode) {
    //TODO
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

  public static getNodesBetween2Node(vnodeA: VNode, vnodeB: VNode): VNode[] {
    const arr = [];
    if (vnodeA.parent === vnodeB.parent) {
      const par = vnodeA.parent;
      let pushing = false;
      for (let i = 0, len = par.children.length; i < len; i++) {
        const isAB = par.children[i] === vnodeA || par.children[i] === vnodeB;
        if (isAB && ! pushing) pushing = true;
        pushing && arr.push(par.children[i]);
        if (isAB && pushing && arr.length > 1) break;
      }
    } else {
      const ccp = VNode.ccp(vnodeA, vnodeB);
      //TODO
    }
    return arr;
  }

  public static splitNode(vnode: VNode, offset: number) {
    if ( ! vnode.text || ! offset || offset >= vnode.text.length) return;
    const text1 = vnode.text.slice(0, offset);
    const text2 = vnode.text.slice(offset);
    vnode.text = text1;
    const newNode = VNode.create();
    newNode.text = text2;
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