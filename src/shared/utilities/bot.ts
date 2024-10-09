export const wait = async (milliseconds = 1000): Promise<void> => await new Promise((resolve) => setTimeout(resolve, milliseconds));

const goto = async (
  url: string,
  milliseconds = 1000,
): Promise<void> => {
  window.open(url, '_blank', 'noopener,noreferrer');
  await wait(milliseconds);
};

export const type = async (
  element: HTMLInputElement,
  text: string,
  milliseconds: number,
): Promise<void> => {
  for (const character of text) {
    await wait(milliseconds / text.length);
    element.value += character;
  }
};

// Réaliser une action une fois par intervalle, c'est un debounce ?
const doActionOncePerIntervalMap = {};
const doActionOncePerInterval = ({ key, action, interval }) => {
  const lastInterval = doActionOncePerIntervalMap[key] ?? 0;

  if (new Date().getTime() - lastInterval > interval) {
    doActionOncePerIntervalMap[key] = new Date().getTime();
    action();
  }
};
