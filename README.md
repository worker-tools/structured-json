# Structured JSON

Stringify and parse JavaScript values according to Structured Clone Algorithm.

This allows sending more advanced JS types across the network, including `Date`, `Map`, `Set`, `ArrayBuffer` and various typed arrays.
See <https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm> fore more.

## Usage
```js
import * as Structured from '@worker-tools/structured-json'
```

The module exposes these functions:
- `Structured.parse`
- `Structured.stringify`
- `Structured.toJSON` 
- `Structured.fromJSON` 
- `Structured.clone` — Same as `globalThis.structuredClone`
