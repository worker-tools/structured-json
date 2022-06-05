// deno-lint-ignore-file no-unused-vars
import 'https://gist.githubusercontent.com/qwtel/b14f0f81e3a96189f7771f83ee113f64/raw/TestRequest.ts'
import {
  assert,
  assertExists,
  assertEquals,
  assertStrictEquals,
  assertStringIncludes,
  assertThrows,
  assertRejects,
  assertArrayIncludes,
} from 'https://deno.land/std@0.133.0/testing/asserts.ts'
const { test } = Deno;

import * as Structured from '../index.ts'

test('exists', () => {
  assertExists(Structured.stringify)
  assertExists(Structured.parse)
  assertExists(Structured.toJSON)
  assertExists(Structured.fromJSON)
})

test('POJO', () => {
  assertEquals(Structured.toJSON({ a: 3 }), { a: 3 })
})

test('Uint8Array', () => {
  const buffer = crypto.getRandomValues(new Uint8Array(32))
  const actual = Structured.fromJSON(Structured.toJSON({ a: buffer }))
  assertEquals(actual, { a: buffer })
})

test('Date', () => {
  const now = Date.now()
  const actual = Structured.fromJSON(Structured.toJSON({ a: now }))
  assertEquals(actual, { a: now })
})

test('ArrayBuffer', () => {
  const actual = Structured.fromJSON(Structured.toJSON({ a: new Uint8Array([1, 2, 3]).buffer }))
  assertEquals(actual, { a: new Uint8Array([1, 2, 3]).buffer })
})

test('Map/Set', () => {
  const actual = Structured.fromJSON(Structured.toJSON({ map: new Map([['a', 3]]), set: new Set([1, 2, 3]) }))
  assertEquals(actual, { map: new Map([['a', 3]]), set: new Set([1, 2, 3]) })
})

test('RegExp', () => {
  const actual = Structured.fromJSON(Structured.toJSON({ a: new RegExp(/abc/g) }))
  assertEquals(actual, { a: new RegExp(/abc/g) })
})

test('String/Boolean to string/boolean', () => {
  const actual = Structured.fromJSON(Structured.toJSON({ str: String("foo"), bool: Boolean(true) }))
  assertEquals(actual, { str: 'foo', bool: true })
})

test('Blob/File/FileList', async () => {
  const buffer = crypto.getRandomValues(new Uint8Array(32))
  const blob = new Blob([buffer], { type: 'application/octet-stream' })
  const file = new File([buffer], 'foo.bin', { type: 'application/octet-stream'})
  const expected = { blob, file }
  const actual = Structured.fromJSON(await Structured.toJSONAsync(expected))
  assertEquals(actual.blob.buffer, blob.buffer)
  assertEquals(actual.blob.type, blob.type)
  assertEquals(actual.file.buffer, file.buffer)
  assertEquals(actual.file.name, file.name)
  assertEquals(actual.file.type, file.type)
})

test('Blob/File/FileList throws when not using async', () => {
  const buffer = crypto.getRandomValues(new Uint8Array(32))
  const expected = { blob: new Blob([buffer], { type: 'application/octet-stream' }) }
  assertThrows(() => Structured.toJSON(expected), TypeError)
})

test('maintaining identity', () => {
  const buffer = crypto.getRandomValues(new Uint8Array(32)).buffer
  const expected = {
    a: new Uint8Array(buffer, 0, 16),
    b: new Uint8Array(buffer, 8, 16),
  }
  const actual = Structured.fromJSON(Structured.toJSON(expected))
  assertEquals(actual.a.buffer, actual.b.buffer)
})
