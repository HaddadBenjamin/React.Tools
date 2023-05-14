import screenOffset from './screenOffset';

interface pageOffsetResponse {
  leftPageOffset: number,
  topPageOffset: number
}

const pageOffset = (element : HTMLElement) : pageOffsetResponse => {
  const { leftScreenOffset, topScreenOffset } = screenOffset(element);

  return {
    leftPageOffset: leftScreenOffset + window?.scrollX,
    topPageOffset: topScreenOffset + window?.scrollY,
  };
};

export const leftPageOffset = (element: HTMLElement) : number => pageOffset(element).leftPageOffset;
export const topPageOffset = (element: HTMLElement) : number => pageOffset(element).topPageOffset;

export default pageOffset;
