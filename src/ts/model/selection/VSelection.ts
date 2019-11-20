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
  isCollapsed?: boolean
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
  private _isCollapsed: boolean
  private _rangeCount: number

  public get anchorNode(): VNode    { return this._anchorNode; }
  public get anchorOffset(): number { return this._anchorOffset; }
  public get focusNode(): VNode     { return this._focusNode; }
  public get focusOffset(): number  { return this._focusOffset; }
  public get isCollapsed(): boolean { return this._isCollapsed; }
  public get rangeCount(): number   { return this._rangeCount; }

  constructor() {
    
  }

  public setSelection(sel: VSelectionData): void {
    this._anchorNode = sel.anchorNode;
    this._anchorOffset = sel.anchorOffset;
    this._focusNode = sel.focusNode,
    this._focusOffset = sel.focusOffset;
    this._isCollapsed = sel.isCollapsed;
    this._rangeCount = sel.rangeCount;
  }

}