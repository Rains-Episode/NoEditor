import { VStyleData } from "./VStyle";
import { Pool } from "../utils/Pool";

let $VNodeKey: number = 0;

export class VNode {

  public entity: any;
  public parent: VNode;
  public children: Array<VNode> = [];

  public style: VStyleData;
  
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
    this.genKey();
  }

  public genKey() {
    this._key = `${++$VNodeKey}`;
  }

  public static create(): VNode {
    const vnode = Pool.getByClass(VNode) as VNode;
    vnode.genKey()
    return vnode;
  }

  public static remove(vnode: VNode) {
    Pool.recoverByClass(vnode);
  }

  public appendChild(child: VNode): void {
    child.parent = this;
    this.children.push(child);
  }

  public remove(): void {
    this._removed = true;
    //TODO
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
    
  }
}