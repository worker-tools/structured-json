import typeson from './typeson.ts'
const { TypesonPromise, toStringTag } = typeson

const blob = {
  blob: {
    test(x) { return toStringTag(x) === 'Blob'; },
    replace(b) {
      return this.replaceAsync(b);
    },
    revive({ type, buffer }) {
      return new Blob([buffer], { type });
    },
    replaceAsync(b) {
      return new TypesonPromise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          resolve({
            type: b.type,
            buffer: reader.result
          });
        });
        reader.addEventListener('error', () => {
          reject(reader.error);
        });
        reader.readAsArrayBuffer(b);
      });
    }
  }
};

export default blob;
