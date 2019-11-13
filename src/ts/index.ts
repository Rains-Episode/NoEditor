import { Editor } from "./component/Editor";

class Main {
  constructor() {
    const editor = new Editor();
    editor.appendTo(document.body);
  }
}
window.onload = () => {
  new Main();
}