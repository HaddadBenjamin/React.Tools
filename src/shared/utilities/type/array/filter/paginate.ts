const paginate = <T, >(array : readonly T[], page : number, pageSize : number, moveSize?: number) : T[] => array.slice((page - 1) * (moveSize ?? pageSize)).slice(0, pageSize);

export default paginate;
