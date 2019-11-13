export class Pool {
  private static __CREATED: string = 'Pool__CREATED'; // created by the pool
  private static __IN_POOL: string = 'Pool__IN_POOL'; // currently in the pool
  private static __pool: { [i: string]: any[] } = {};

  static getPoolBySign(sign: string): any[] {
    return Pool.__pool[sign] || (Pool.__pool[sign] = []);
  }

  private static _getByDefault(sign: string, def?: any): any {
    let pool = Pool.getPoolBySign(sign);
    let ins = pool.length ? pool.pop() : def;
    ins !== void 0 && (ins[Pool.__IN_POOL] = false);
    ins[Pool.__CREATED] = true;
    return ins;
  }

  static getByFn(sign: string, fn?: Function): any {
    return Pool._getByDefault(sign, ((fn instanceof Function) && fn()) || void 0) ;
  }

  static getBySign(sign: string): any {
    return Pool._getByDefault(sign);
  }

  static getByClass(cls: any): any {
    return Pool._getByDefault(cls.name, new cls());
  }

  static recoverBySign(sign: string, ins: any): void {
    if ( ! ins[Pool.__CREATED]) return; // only object created by the pool will be recover 
    if (ins[Pool.__IN_POOL]) return;
    ins[Pool.__IN_POOL] = true;
    Pool.getPoolBySign(sign).push(ins);
  }

  static recoverByClass(ins: object): void {
    Pool.recoverBySign(ins.constructor.name, ins);
  }

  static clearPoolBySign(sign: string): void {
    Pool.__pool[sign] && (Pool.__pool[sign].length = 0);
  }

  static clearPoolByClass(cls: any) {
    Pool.clearPoolBySign(cls.name);
  }
}