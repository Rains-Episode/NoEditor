import { Editor } from "./component/Editor";

class Main {
  constructor() {
    
  }
}
window.onload = () => {
  const editor = new Editor();
  window['noeditor'] = editor;
  editor.appendMenuTo(document.body);
  editor.appendTo(document.body);
}