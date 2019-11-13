import { VStyleData } from "./VStyle";

let $VNodeKey: number = 0;

export abstract class VNode {

  public parent: VNode;
  public children: Array<VNode> = [];

  public style: VStyleData;
  
  private _key: string = `${++$VNodeKey}`;
  private _removed: boolean = false;

  public get key(): string { return this._key; }
  public get removed(): boolean { return this._removed; }

  constructor() {
    
  }

  public appendChild(child: VNode): void {
    child.parent = this;
    this.children.push(child);
  }

  public remove(): void {
    this._removed = true;
    //TODO
  }
}