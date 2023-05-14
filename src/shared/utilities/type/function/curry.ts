// Ex :
// const fn = function sum(a, b, c) { return a + b + c; };
// const curriedSum = curry(fn);
// curriedSum(1)(2)(3); // outputs 6
const curry = <T extends any[], R>(fn: (...args: T) => R) => {
  const curried = (...args: T) => {
    if (args.length >= fn.length) return fn(...args);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (...moreArgs: T) => curried(...args, ...moreArgs);
  };
  return curried;
};

export default curry;
