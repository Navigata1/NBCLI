import { gradients, colors } from './theme.js';

const ASCII_ART = `
  _   _            _   _     ____  _             
 | \\ | | ___  _ __| |_| |__ / ___|| |_ __ _ _ __ 
 |  \\| |/ _ \\| '__| __| '_ \\\\___ \\| __/ _\` | '__|
 | |\\  | (_) | |  | |_| | | |___) | || (_| | |   
 |_| \\_|\\___/|_|   \\__|_| |_|____/ \\__\\__,_|_|   
`;

const VERSION = '0.1.0';

export const printBanner = () => {
  console.log(gradients.primary(ASCII_ART));
  console.log(
    colors.muted('                                    ') +
      colors.bold(colors.primary('BUILD')) +
      colors.muted(' v' + VERSION)
  );
  console.log();
};

export const printMini = () => {
  console.log(
    gradients.primary('◆ NorthStar') + colors.muted(' Build v' + VERSION)
  );
  console.log();
};
