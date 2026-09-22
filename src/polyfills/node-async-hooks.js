export class AsyncLocalStorage {
  constructor() {}
  run(store, fn) {
    return typeof fn === "function" ? fn() : fn;
  }
  getStore() {
    return undefined;
  }
  static snapshot() {
    return undefined;
  }
}
