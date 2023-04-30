# cursor-pos

A bash-based package to get the current position in the terminal.

Will only work on systems that have bash.

# Installation
Install with npm:

```bash
npm install cursor-pos
```

# Usage

```javascript
const getCursorPosition = require('./cursor-pos');

async function main() {
  let pos = await getCursorPosition();
  console.log('pos: ', pos);
}

main();
```

Output:
```bash
pos:  { row: 13, column: 0 }
```

# Credit
Inspired by cursor.js from [here](https://gist.github.com/oxyo/be52858a77c9dc98160142868e1263e5).
