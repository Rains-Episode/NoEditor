import { VEditor } from "../model/editor/VEditor";

export interface EditorOptions {
  rows?: number,
  cols?: number,
}

export class Editor {
  private _body: HTMLElement;

  private _soul: VEditor = new VEditor();
  private _options: EditorOptions = {
    rows: 10,
    cols: 30
  }
  constructor(options?: EditorOptions) {
    for (let i in options) this._options[i] = options[i];
    const ops = this._options;
    const div = document.createElement('div');
    //TODO set editor style
    div.contentEditable = 'true';
    div.style.border = '1px solid #aaa';
    div.style.width = `${ops.cols}rem`;
    div.style.height = `${ops.rows}rem`;
    this._body = div;
    this.onListener();
  }

  public appendTo(parent: HTMLElement): HTMLElement {
    return parent.appendChild(this._body);
  }

  private _oninput(e: InputEvent) {
    this._soul.oninput(e.data);
  }

  private _onselectionchange(e: Event) {
    const sel = window.getSelection();
    console.log('current selection: ', sel);
  }

  public onListener() {
    this._body.oninput = (e: InputEvent) => { this._oninput(e) };
    document.onselectionchange = (e: Event) => { this._onselectionchange(e); }
  }
}