import { VEditor } from "../model/editor/VEditor";
import { $h, $domApi } from "../model/renderer/H";
import { VSelectionData } from "../model/selection/VSelection";

export interface EditorOptions {
  rows?: number,
  cols?: number,
}

export class Editor {
  private _body: HTMLElement;
  private _soul: VEditor = new VEditor();

  private _isNeedRender: boolean = true;
  private _isSelectStarted: boolean = false;

  private _options: EditorOptions = {
    rows: 10,
    cols: 30
  }

  public get body(): HTMLElement { return this._body; }
  public get soul(): VEditor { return this._soul; }

  constructor(options?: EditorOptions) {
    for (let i in options) this._options[i] = options[i];
    const ops = this._options;
    const div = document.createElement('div');
    //TODO set editor style
    div.contentEditable = 'true';
    div.id = 'no-editor';
    div.style.border = '1px solid #aaa';
    div.style.width = `${ops.cols}rem`;
    div.style.height = `${ops.rows}rem`;
    this._body = div;
    this._render();
    this.onListener();
  }

  public appendTo(parent: HTMLElement): HTMLElement {
    return parent.appendChild(this._body);
  }

  private get _isFocusOnEditor(): boolean {
    const sel = window.getSelection();
    return $domApi.isFocusOnEle(sel.anchorNode, this._body) || $domApi.isFocusOnEle(sel.focusNode, this._body);
  }

  private _oninput(e: InputEvent) {
    const sel = window.getSelection();
    this._soul.oninput(sel.anchorNode.textContent);
    this._isNeedRender = true;
    this._isSelectStarted = true;
    this._onselectend();
  }
  
  private _onmousedown(e: MouseEvent) {
    document.onmouseout = (e: MouseEvent) => { this._onselectend(e) }
  }

  private _onselectstart(e: Event) {
    console.log('select start', window.getSelection());
    this._isSelectStarted = true;
  }

  private _onselectend(e?: MouseEvent) {
    document.onmouseout = void 0;
    console.log('select end')
    if ( ! this._isSelectStarted) return;
    this._isSelectStarted = false;
    const sel = window.getSelection();
    console.log('rsel : ', sel);
    let vsel: VSelectionData;
    if (this._isFocusOnEditor) {
      vsel = {
        anchorNode: this._soul.content,
        anchorOffset: sel.anchorOffset,
        focusNode: this._soul.content,
        focusOffset: sel.focusOffset,
        isCollapsed: sel.isCollapsed,
        rangeCount: sel.rangeCount
      }
    } else {
      vsel = {
        anchorNode: $domApi.isTextNode(sel.anchorNode)
          ? $h.getVNodeByEle(sel.anchorNode.parentElement)
          : $h.getVNodeByEle(sel.anchorNode),
        anchorOffset: sel.anchorOffset,
        focusNode: $domApi.isTextNode(sel.focusNode)
          ? $h.getVNodeByEle(sel.focusNode.parentElement)
          : $h.getVNodeByEle(sel.focusNode),
        focusOffset: sel.focusOffset,
        isCollapsed: sel.isCollapsed,
        rangeCount: sel.rangeCount
      }
    }
    this._soul.onselectionchange(vsel);
    console.log('vsel : ', vsel);
    this._render();
  }

  private _render() {
    if ( ! this._isNeedRender) return;
    console.log('re render');
    this._isNeedRender = false;
    this._body.textContent = '';
    this._body.appendChild($h.renderNode(this._soul.content));
    this._renderSelection();
  }

  private _renderSelection() {
    const vsel = this._soul.selection;
    if ( ! vsel.anchorNode || ! vsel.anchorNode.entity || ! vsel.anchorNode.entity.childNodes || ! vsel.anchorNode.entity.childNodes[0]) return;
    $domApi.setCaretPos(vsel.anchorNode.entity.childNodes[0], vsel.anchorOffset);
  }

  public onListener() {
    this._body.oninput = (e: InputEvent) => { this._oninput(e) };
    document.onselectstart = (e: Event) => { this._onselectstart(e); }
    document.onmousedown = (e: MouseEvent) => { this._onmousedown(e); }
    document.onmouseup = (e: MouseEvent) => { this._onselectend(e); }
  }
}