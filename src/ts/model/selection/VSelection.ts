import { VNode } from "../content/VNode";

export interface VRangeData {
  anchorNode?: VNode,
  anchorOffset?: number,
  focusNode?: VNode,
  focusOffset?: number
}

export interface VSelectionData {
  anchorNode?: VNode;
  anchorOffset?: number;
  focusNode?: VNode;
  focusOffset?: number;
  rangeCount?: number
}

/**
 *  
 * 
 */
export class VSelection {

  private _anchorNode: VNode;
  private _anchorOffset: number;
  private _focusNode: VNode;
  private _focusOffset: number;
  private _rangeCount: number

  public get anchorNode(): VNode    { return this._anchorNode; }
  public get anchorOffset(): number { return this._anchorOffset; }
  public get focusNode(): VNode     { return this._focusNode; }
  public get focusOffset(): number  { return this._focusOffset; }
  public get isCollapsed(): boolean { return this._anchorNode === this._focusNode && this._anchorOffset === this._focusOffset }
  public get rangeCount(): number   { return this._rangeCount; }

  constructor() {
    
  }



  public get selectedNodes(): VNode[] {
    const arr = [];
    //TODO
    return arr;
  }

  public selectOn(vnode: VNode, anchorOffset?: number, focusOffset?: number): void {
    this._anchorNode = this._focusNode = vnode;
    anchorOffset || (anchorOffset = 0);
    focusOffset != void 0 || (focusOffset = vnode.text.length);
    this._anchorOffset = anchorOffset;
    this._focusOffset = focusOffset;
  }

  public focusOn(vnode: VNode, offset: number): void {
    this._anchorNode = this._focusNode = vnode;
    this._anchorOffset = this._focusOffset = offset;
  }

  public setSelection(sel: VSelectionData): void {
    this._anchorNode = sel.anchorNode;
    this._anchorOffset = sel.anchorOffset;
    this._focusNode = sel.focusNode,
    this._focusOffset = sel.focusOffset;
    this._rangeCount = sel.rangeCount;
  }

}