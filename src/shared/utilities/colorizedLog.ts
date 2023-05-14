export enum TextColor {
  Black = '\x1b[30m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Magenta = '\x1b[35m',
  Cyan = '\x1b[36m',
  White = '\x1b[37m',
}

export enum LogType {
  Log,
  Warning,
  Error,
}

export default (textColor: TextColor, logType: LogType, text: string) => {
  switch (logType) {
    case LogType.Error:
      console.error(textColor, text);
      break;
    case LogType.Log:
      console.log(textColor, text);
      break;
    case LogType.Warning:
      console.warn(textColor, text);
      break;
    default:
      break;
  }
};
