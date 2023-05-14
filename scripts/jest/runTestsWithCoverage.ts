import colorizedLog, {
  LogType,
  TextColor,
} from '../../src/shared/utilities/colorizedLog';

const cmd = require('node-cmd');

const commandParameters = process.argv.splice(2);

if (commandParameters.length === 0)
  colorizedLog(
    TextColor.Red,
    LogType.Error,
    "runTestsWithCoverage.ts need at least one parameter, the first parameter is the directory path to cover, ex: src/domains/todo\nAll other parameters should not start by '--'\nUsage example: npm run test:coverage shared/redux"
  );
else {
  try {
    const coverageBasePath = commandParameters[0];
    const otherCommandParameters = commandParameters
      .splice(1)
      .map(p => `--${p}`);
    const watchAll = `--watchAll=false`;
    const testPathPattern = `--testPathPattern=${coverageBasePath}/`;
    const coverage = '--coverage';
    const commandWithParameters = `npm test -- ${watchAll} ${testPathPattern} ${coverage} ${otherCommandParameters}`;

    cmd.runSync(commandWithParameters);

    colorizedLog(
      TextColor.Cyan,
      LogType.Log,
      `Executed command: ${commandWithParameters}`
    );
  } catch (error) {
    colorizedLog(
      TextColor.Red,
      LogType.Error,
      `runCoverage.js encounter the following error during parsing or executing the command ${error}`
    );
  }
}
