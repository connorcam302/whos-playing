const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function execAsync(cmd) {
  try {
    const { stdout, stderr } = await exec(cmd);
    return stdout;
  } catch (e) {
    console.error(e);
  }
}

async function GetCursorPosition() {
  let result = await execAsync('./cursor-position.sh');
  return JSON.parse(result);
};

module.exports = function () {
  return GetCursorPosition();
};
