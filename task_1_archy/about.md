Доброго времени суток.

В итоге сотый раз прочитав задание до меня стало доходить как надо сделать.

я сделал 2 варианта.

Вариант 1 (простой).
есть uglify.js и clerify.js, они соответственно шифруют и разшифруют, из input.txt в output.txt, со смещением в 3 символа. каждый запускается просто node uglify.js / node clerify.js.

Вариант 2 (по заданию).
есть my_caesar_cli.js,
для команд я искользовал commander.
соответственно команды:
program
  .version('0.0.1')
  .option('-s, --shift <number>', 'a shift', '3')
  .option('-i, --input <pathIn>', 'an input file', './input.txt')
  .option('-o, --output <pathOut>', 'an output file', './output.txt')
  .option('-a, --action <action>', 'an action encode/decode', 'wrong');

// Примеры команды зашифровать:
// node my_caesar_cli.js -s 3 -i './input.txt' -o './output.txt' -a encode

// Примеры команды разшифровать:
// node my_caesar_cli.js -s 3 -i './output.txt' -o './output_clered.txt' -a decode


P.S. Такие вещи как пробелы и прочие знаки препинания я учитывать не стал, только Русский и Английский алфавиты.