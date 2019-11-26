import { VEditor } from "../model/editor/VEditor";
import { $h, $domApi } from "../model/renderer/H";
import { VSelectionData } from "../model/selection/VSelection";
import { CommandType } from "../model/command/Commands";

export interface EditorOptions {
  rows?: number,
  cols?: number,
  menus?: Record<CommandType, any>,
}

export class Editor {
  private _body: HTMLElement;
  private _menu: HTMLElement;
  private _soul: VEditor = new VEditor();

  private _options: EditorOptions = {
    rows: 10,
    cols: 30,
    menus: {
      clear: true,
      bold: true,
      italic: true,
      underline: true
    }
  }

  public get body(): HTMLElement { return this._body; }
  public get menu(): HTMLElement { return this._menu; }
  public get soul(): VEditor { return this._soul; }

  constructor(options?: EditorOptions) {
    for (let i in options) this._options[i] = options[i];
    const ops = this._options;
    const divBody = $domApi.createElement('div');
    //TODO set editor style
    divBody.contentEditable = 'true';
    divBody.id = 'no-editor';
    divBody.style.border = '1px solid #aaa';
    divBody.style.width = `${ops.cols}rem`;
    divBody.style.height = `${ops.rows}rem`;
    this._body = divBody;

    const divMenu = $domApi.createElement('div');
    for (let i in ops.menus) {
      const btn = $domApi.createElement('button');
      btn.textContent = i;
      divMenu.appendChild(btn);
      btn.onclick = () => {
        this.execCommand(i as CommandType)
      }
    }
    this._menu = divMenu;

    this._rerender();
    this.onListener();
  }

  public appendTo(parent: HTMLElement): HTMLElement {
    return parent.appendChild(this._body);
  }

  public appendMenuTo(parent: HTMLElement): HTMLElement {
    return parent.appendChild(this._menu);
  }

  public execCommand(cmd: CommandType) {
    this._soul.execCommand(cmd);
    this._rerender();
  }

  private get _isFocusOnEditor(): boolean {
    const sel = window.getSelection();
    return $domApi.isFocusOnEle(sel.anchorNode, this._body) || $domApi.isFocusOnEle(sel.focusNode, this._body);
  }

  private _oninput(e: InputEvent) {
    const sel = window.getSelection();
    this._soul.oninput(e.data);
    this._rerender();
  }
  
  private _onmousedown(e: MouseEvent) {
    document.onmouseup = (e: MouseEvent) => { console.log('window mouse up'); this._onselectend(e); }
  }

  private _onselectend(e?: MouseEvent) {
    document.onmouseup = void 0;
    console.log('================= select end ==================');
    const sel = window.getSelection();
    console.log('rsel : ', sel);
    let vsel: VSelectionData;
    if (this._isFocusOnEditor) {
      vsel = {
        anchorNode: this._soul.$root,
        anchorOffset: sel.anchorOffset,
        focusNode: this._soul.$root,
        focusOffset: sel.focusOffset,
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
        rangeCount: sel.rangeCount
      }
    }
    this._soul.onselectionchange(vsel);
    console.log('vsel : ', vsel);
  }

  private _rerender() {
    console.log('re render');
    this._renderNodes();
    this._renderSelection();
  }

  private _renderNodes() {
    this._body.textContent = '';
    this._body.appendChild($h.renderNode(this._soul.$root));
  }

  private _renderSelection() {
    const vsel = this._soul.selection;
    if ( ! vsel.anchorNode || ! vsel.anchorNode.entity || ! vsel.anchorNode.entity.childNodes || ! vsel.anchorNode.entity.childNodes[0]) return;
    $domApi.setSelection($domApi.getTextChild(vsel.anchorNode.entity), vsel.anchorOffset, $domApi.getTextChild(vsel.focusNode.entity), vsel.focusOffset);
  }

  public onListener() {
    this._body.oninput = (e: InputEvent) => { this._oninput(e) };
    document.onmousedown = (e: MouseEvent) => { this._onmousedown(e); }
  }
}