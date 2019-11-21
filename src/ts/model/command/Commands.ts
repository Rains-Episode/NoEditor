import { VNode } from "../content/VNode";

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

export const execCommand = (cmd: CommandType, vnode: VNode) => {
  if ( ! CommandsType[cmd]) return;
  Commands[cmd](vnode);
}

export const Commands: Record<CommandType, (vnode: VNode) => void> = {
  clear: (vnode: VNode) => {
    vnode.style.clearStyle();
  },
  bold: (vnode: VNode) => {
    vnode.style.appendStyle(CommandsType.bold, true);
  },
  italic: (vnode: VNode) => {
    vnode.style.appendStyle(CommandsType.italic, true);
  },
  underline: (vnode: VNode) => {
    vnode.style.appendStyle(CommandsType.underline, true);
  }
}
