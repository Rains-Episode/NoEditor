import { $domApi } from "../model/renderer/H";
import { Editor } from "./Editor";

export interface MenusOptions {
  clear?: boolean,
  bold?: boolean,
  italic?: boolean,
  underline?: boolean
}
export class Menus {

  private _editor: Editor;

  private _options: MenusOptions = {
    clear: true,
    bold: true,
    italic: true,
    underline: true
  }

  private _body: HTMLElement;
  
  constructor(editor: Editor, options?: MenusOptions) {
    this._editor = editor;
    for (let i in options) this._options[i] = options[i];
    const div = $domApi.createElement('div');
    //TODO
    for (let i in options) {
      const btn = $domApi.createElement('button');
      btn.textContent = i;
      div.appendChild(btn);
      btn.onclick = () => {
        
      }
    }
    this._body = div;
  }

  public appendTo(parent: HTMLElement): HTMLElement {
    return parent.appendChild(this._body);    
  }
}