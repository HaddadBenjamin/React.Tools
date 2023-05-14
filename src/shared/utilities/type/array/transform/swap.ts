const swap = <T, >(array : readonly T[], source : T, destination : T) : readonly T[] => array.map((element) => (element === source ? destination
  : element === destination ? source
    : element),
);

export default swap;
