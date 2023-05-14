interface IScreenOffsetResponse {
  leftScreenOffset: number,
  topScreenOffset: number
}

const screenOffset = (element : HTMLElement) : IScreenOffsetResponse => {
  const { left, top } = element?.getBoundingClientRect();

  return {
    leftScreenOffset: left,
    topScreenOffset: top,
  };
};

export const leftScreenOffset = (element: HTMLElement) : number => screenOffset(element).leftScreenOffset;
export const topScreenOffset = (element: HTMLElement) : number => screenOffset(element).topScreenOffset;

export default screenOffset;
