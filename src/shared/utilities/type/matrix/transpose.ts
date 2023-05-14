/* eslint-disable no-plusplus */
// Ex :
//      [1, 2, 3]        [1, 4]
//      [4, 5, 6]   =>   [2, 5]
//                       [3, 6]
const transpose = <T, >(matrix: T[][]) : T[][] => {
  const [m, n] = [matrix.length, matrix[0].length];
  const transpose : T[][] = Array.from({ length: n }, () => Array.from({ length: m }));

  for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) transpose[i][j] = matrix[j][i];

  return transpose;
};

export default transpose;
