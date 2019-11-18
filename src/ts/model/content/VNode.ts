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



  public static findCommonParent(vnodeA: VNode, vnodeB: VNode): VNode {
    const getTreeLen = (vnode: VNode) => {
      let len = 0;
      let par = vnode;
      while(par = vnode.parent) len++;
      return len;
    }
    let lenA = getTreeLen(vnodeA);
    let lenB = getTreeLen(vnodeB);
    for (; lenA > lenB; lenA--) vnodeA = vnodeA.parent;
    for (; lenB > lenA; lenB--) vnodeB = vnodeB.parent;
    // while() {
      
    // }
    return;
  }

  public static getNodesBetween2Node(vnodeA: VNode, vnodeB: VNode): VNode[] {
    const arr = [];
    if (vnodeA.parent === vnodeB.parent) {
      const par = vnodeA.parent;
      for (let i = 0, len = par.children.length; i < len; i++) {
        const canPush = par.children[i] === vnodeA || par.children[i] === vnodeB;
        if ( ! canPush) continue;
        arr.push(par.children[i]);
        if (arr.length) break;
      }
    } else {
      //TODO
      let parA = vnodeA;
      let parB = vnodeB;
      while(parA.parent) {
        while(parB.parent) {
          if (parA === parB) break;
          parB = parB.parent;
        }
        if (parA === parB) break;
        parA = parA.parent;
      }
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