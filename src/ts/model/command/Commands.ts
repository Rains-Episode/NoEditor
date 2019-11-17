import { VNode } from "../content/VNode"

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
    vnode.style = {};
  }

  static bold(vnode: VNode) {
    vnode.style[CommandsType.bold] = true;
  }

  static italic(vnode: VNode) {
    vnode.style[CommandsType.italic] = true;
  }

  

}