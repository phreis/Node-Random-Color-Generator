import { argv } from 'node:process';
import chalk from 'chalk';
import tinycolor from 'tinycolor2';

function getRandomColorCode() {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
}

function getColorCodeFromHue(hue, luminosity) {
  const _color = tinycolor(hue);
  if (luminosity === 'light') {
    _color.brighten();
  }
  if (luminosity === 'dark') {
    _color.darken();
  }
  return _color.toHexString();
}

function getUserInput() {
  const retVal = {};
  argv.forEach((val, index) => {
    if (index === 2) {
      retVal.hue = val;
    }
    if (index === 3) {
      retVal.luminosity = val;
    }
  });
  return retVal;
}
// console.log(`hue: ${hue}, luminosity: ${luminosity}`);

// Get colorCode
let colorCode;
const userInput = getUserInput();
if (userInput.hue) {
  // console.log('color from hue parameter:' + getColorCodeFromHue(hue, luminosity));
  if (!userInput.luminosity) {
    userInput.luminosity = null;
  }
  colorCode = getColorCodeFromHue(userInput.hue, userInput.luminosity);
} else {
  colorCode = getRandomColorCode();
}

const gridTemplate = `
##############################
##############################
##############################
#####                    #####
#####      ${colorCode}       #####
#####                    #####
##############################
##############################
##############################
`;

const colorChalk = chalk.hex(colorCode);
console.log(colorChalk(gridTemplate));
