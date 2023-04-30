const getCursorPosition = require('./cursor-position');

async function main() {
  let pos = await getCursorPosition();
  console.log('pos: ', pos);
}
main();
