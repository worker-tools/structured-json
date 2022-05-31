// deno-lint-ignore-file no-explicit-any
// @ts-ignore: typeson doesn't have types...
import * as typeson from 'https://cdn.skypack.dev/typeson@7.0.2';
// @ts-ignore: typeson doesn't have types...
import { structuredCloningThrowing } from 'https://unpkg.com/typeson-registry@3.0.0/dist/index.js';
const { Typeson } = 'default' in typeson ? (<any>typeson).default : typeson
const Structured = new Typeson().register([structuredCloningThrowing]);

export function parse(s: string) {
  return Structured.revive(JSON.parse(s))
}

export function stringify(value: any): string {
  return JSON.stringify(Structured.encapsulate(value))
}

export function clone(value: any) {
  return 'structuredClone' in globalThis ? (<any>globalThis).structuredClone(value) : parse(stringify(value))
}

export function toJSON(value: any) {
  return Structured.encapsulate(value)
}

export function fromJSON(json: any) {
  return Structured.revive(json)
}

// export function equals(a: any, b: any) {
//   // FIXME
//   return stringify(a) === stringify(b)
// }

export { toJSON as toJSONValue }
export { fromJSON as fromJSONValue }