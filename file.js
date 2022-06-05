import typeson from './typeson.ts'
const { TypesonPromise, toStringTag } = typeson

const file = {
  file: {
    test(x) { return toStringTag(x) === 'File'; },
    replace(f) {
      return this.replaceAsync(f);
    },
    revive({ name, type, buffer, lastModified }) {
      return new File([buffer], name, { type, lastModified });
    },
    replaceAsync(f) {
      return new TypesonPromise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          resolve({
            type: f.type,
            buffer: reader.result,
            name: f.name,
            lastModified: f.lastModified
          });
        });
        reader.addEventListener('error', () => {
          reject(reader.error);
        });
        reader.readAsArrayBuffer(f);
      });
    }
  }
};

export default file;
