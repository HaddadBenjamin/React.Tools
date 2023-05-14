/* Exemple : compose([x => x * 2, x => x * x, x => x + 1])(4)
  2 * (4) = 8
 (8) * (8) = 64
 (64) + 1 = 65
*/
// eslint-disable-next-line @typescript-eslint/ban-types
const compose = <T, >(functions: Function[]) => (parameter: T) => functions.reduce((result, func) => func(result), parameter);

export default compose;
