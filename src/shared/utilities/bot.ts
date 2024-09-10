import wait from './type/promise/wait';

const type = async (
  element: HTMLInputElement,
  text: string,
  milliseconds: number
): void => {
  for (const character of text) {
    await wait(milliseconds / text.length);
    element.value += character;
  }
};
