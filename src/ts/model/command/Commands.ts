import { VNode } from "../content/VNode"
import { VStyle } from "../content/VStyle";

export type CommandType = 
    'clear'
  | 'bold'
  | 'italic'
  | 'underline'

export const CommandsType: Record<CommandType, CommandType> = {
  clear: 'clear',
  bold: 'bold',
  italic: 'italic',
  underline: 'underline'
}

export class Commands {
  
  static clear(vnode: VNode) {
    vnode.style.clearStyle();
  }

  static bold(vnode: VNode) {
    vnode.style.appendStyle(CommandsType.bold, true);
  }

  static italic(vnode: VNode) {
    vnode.style.appendStyle(CommandsType.italic, true);
  }

}