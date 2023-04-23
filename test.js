const readline = require('readline');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const infinityFrames = [
  '     ∞     ',
  '   ∞ ∞ ∞   ',
  '     ∞     '
];

const fadeSteps = [
  '\x1b[90m', // Light gray (faded)
  '\x1b[37m', // White (normal)
  '\x1b[90m'  // Light gray (faded)
];

const clearScreen = () => {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
};

const renderFrame = (frameIndex, fadeStep) => {
  const frame = infinityFrames[frameIndex];
  const colorCode = fadeSteps[fadeStep];
  console.log(colorCode + frame + '\x1b[0m');
};

const animateInfinity = async () => {
  let frameIndex = 0;
  let fadeStep = 0;
  while (true) {
    clearScreen();
    renderFrame(frameIndex, fadeStep);
    frameIndex = (frameIndex + 1) % infinityFrames.length;
    fadeStep = (fadeStep + 1) % fadeSteps.length;
    await sleep(200); // Delay between frames
  }
};

animateInfinity();