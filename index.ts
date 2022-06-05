// deno-lint-ignore-file no-explicit-any ban-ts-comment
import typeson from './typeson.ts'
// @ts-ignore
import { structuredCloningThrowing } from 'https://unpkg.com/typeson-registry@3.0.0/dist/index.js';

import blob from './blob.js'
import file from './file.js'
import filelist from './filelist.js'

const { Typeson } = typeson;

const structuredCloningThrowingPatched = (structuredCloningThrowing as any[])
  .filter((x: any) => !x.file && !x.blob)
  .concat([blob, file, filelist])

const Structured = new Typeson().register([structuredCloningThrowingPatched]);

export function parse(s: string) {
  return Structured.revive(JSON.parse(s))
}

export function stringify(value: any): string {
  return Structured.stringifySync(value);
}

export function stringifyAsync(value: any): string | Promise<string> {
  return Structured.stringifyAsync(value);
}

export function toJSON(value: any): any {
  return Structured.encapsulateSync(value)
}

export function toJSONAsync(value: any): any | Promise<any> {
  return Structured.encapsulateAsync(value)
}

export function fromJSON(json: any) {
  return Structured.revive(json)
}

export { 
  toJSON as toJSONValue, 
  fromJSON as fromJSONValue,
  fromJSON as revive,
  toJSON as encapsulate, 
  toJSONAsync as encapsulateAsync,
}
