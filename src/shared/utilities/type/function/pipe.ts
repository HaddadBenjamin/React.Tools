// Avant: addOne(square(triple(3)))
// Après: pipe<number>(addOne, square, triple)(3)
// Rend plus lisible le chaînage de fonction
const pipe = <T>(...functions: Array<(parameter: T) => T>) => (parameter: T) => functions.reduce((parameter, func) => func(parameter), parameter);

export default pipe;
