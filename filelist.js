import typeson from './typeson.ts'
const { toStringTag } = typeson
import file from './file.js';

const filelist = {
  file: file.file,
  filelist: {
    test(x) { return toStringTag(x) === 'FileList'; },
    replace(fl) {
      const arr = [];
      for (let i = 0; i < fl.length; i++) {
        arr[i] = fl.item(i);
      }
      return arr;
    },
    revive(o) {
      return new FileList(o);
    }
  }
};

// Even if native impl is available, ctor can't be invoked from userland...

/** `FileList` polyfill */
export class FileList {
  #files;
  #length;

  /** Set private properties and length */
  constructor() {
    this.#files = arguments[0];
    this.#length = this.#files.length;
  }

  /**
   * @param {number} index
   * @returns {File}
   */
  item(index) { return this.#files[index] }

  /** @returns {number} */
  get length() { return this.#length }

  /** @readonly @type {"FileList"} */
  [Symbol.toStringTag] = 'FileList'
}

export default filelist;
