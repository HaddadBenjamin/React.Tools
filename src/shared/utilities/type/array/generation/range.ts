const range = (count: number, maximum?: number) => (maximum
  ? new Array(maximum - count + 1)
    .fill(0)
    .map((element, index) => index + maximum - count)
  : new Array(count).fill(0).map((element, index) => index + 1));

// [...Array(10).keys()]                     => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// Array.from({length: 10}, (_, i) => i + 1) => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default range;
