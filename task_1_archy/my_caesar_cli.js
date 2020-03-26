const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'А',
  'Б',
  'В',
  'Г',
  'Д',
  'Е',
  'Ё',
  'Ж',
  'З',
  'И',
  'Й',
  'К',
  'Л',
  'М',
  'Н',
  'О',
  'П',
  'Р',
  'С',
  'Т',
  'У',
  'Ф',
  'Х',
  'Ц',
  'Ч',
  'Ш',
  'Щ',
  'Ъ',
  'Ы',
  'Ь',
  'Э',
  'Ю',
  'Я',
  'а',
  'б',
  'в',
  'г',
  'д',
  'е',
  'ё',
  'ж',
  'з',
  'и',
  'й',
  'к',
  'л',
  'м',
  'н',
  'о',
  'п',
  'р',
  'с',
  'т',
  'у',
  'ф',
  'х',
  'ч',
  'ч',
  'ш',
  'щ',
  'ъ',
  'ы',
  'ь',
  'э',
  'ю',
  'я'
];

program
  .version('0.0.1')
  .option('-s, --shift <number>', 'a shift', '3')
  .option('-i, --input <pathIn>', 'an input file', './input.txt')
  .option('-o, --output <pathOut>', 'an output file', './output.txt')
  .option('-a, --action <action>', 'an action encode/decode', 'empty');

program.parse(process.argv);

console.log('program.shift:', program.shift);
console.log('program.input:', program.input);
console.log('program.output:', program.output);
console.log('program.action:', program.action);

const uglyAlphabet = alphabet
  .slice(program.shift)
  .concat(alphabet.slice(0, program.shift));

openData(); // понеслась...

function openData() {
  console.log('Попытка прочитать данные из файла ...');
  fs.readFile(program.input, 'utf-8', (err, data) => {
    if (err) {
      console.error('!!! Произошла ошибка !!!');
      console.error(err);
      return;
    }
    console.log('Начальный текст:', data);

    if (program.action === 'encode') {
      console.log('program.action === encode');
      encode(data);
    } else if (program.action === 'decode') {
      console.log('program.action === decode');
      decode(data);
    } else if (program.action === 'empty') {
      console.log('program.action === empty');
      console.log(
        'program.action do not choosed, you should choose encode/decode directive.'
      );
    } else {
      console.log('По всей видимости допущена ошибка...');
      console.log('program.action:', program.action);
    }
  });
}

function writeData(newContent) {
  console.info('Попытка записать данные в файл ...');
  fs.writeFile(program.output, newContent, err => {
    if (err) {
      console.error('!!! Произошла ошибка !!!');
      console.error(err);
      return;
    }
    console.info('Файл успешно записан!');
  });
}

function uglifyData(content) {
  console.info('Попытка засекретить данные ...');
  const contentArray = content.split('');
  let newContent = '';

  contentArray.forEach((item, index) => {
    if (alphabet.indexOf(item) === -1) {
      newContent += contentArray[index];
    } else {
      newContent += uglyAlphabet[alphabet.indexOf(item)];
    }
  });
  return newContent;
}

function cleryfyData(content) {
  console.info('Попытка разсекретить данные данные ...');
  const contentArray = content.split('');
  let newContent = '';

  contentArray.forEach((item, index) => {
    if (uglyAlphabet.indexOf(item) === -1) {
      newContent += contentArray[index];
    } else {
      newContent += alphabet[uglyAlphabet.indexOf(item)];
    }
  });
  return newContent;
}

function encode(content) {
  console.log('encode() started...');
  const newContent = uglifyData(content);
  writeData(newContent);
}

function decode(content) {
  console.log('decode() started...');
  const newContent = cleryfyData(content);
  writeData(newContent);
}

// examples:
// node my_caesar_cli.js -s 3 -i './input.txt' -o './output.txt' -a encode
// node my_caesar_cli.js -s 3 -i './output.txt' -o './output_clered.txt' -a decode
